import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfilesService } from '../profile/profiles.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  private readonly saltLength = 16;
  private readonly hashAlgorithm = 'sha256';
  constructor(
    private profilesService: ProfilesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 100000, 64, this.hashAlgorithm)
      .toString('hex');
  }

  generateSalt(): string {
    return crypto.randomBytes(this.saltLength).toString('hex');
  }

  async signUp(login: string, pwd: string): Promise<any> {
    const profile = await this.profilesService.findOneByLogin(login);
    if (profile) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    const salt = this.generateSalt();
    const hashPwd = this.hashPassword(pwd, salt);
    const createdProfile = await this.profilesService.createProfile(
      login,
      hashPwd,
      salt,
    );
    if (!createdProfile) {
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const payload = { sub: createdProfile.id, login: createdProfile.login };
    return {
      user: createdProfile,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: this.configService.get('ACCESS_JWT_SECRET'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: this.configService.get('REFRESH_JWT_SECRET'),
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async signIn(login: string, pwd: string): Promise<any> {
    const profile = await this.profilesService.findOneByLogin(login);
    if (!profile) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const hashedPwd = this.hashPassword(pwd, profile.salt);
    const isEqual = profile.hashPwd === hashedPwd;
    if (!isEqual) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: profile.id, login: profile.login };
    return {
      user: profile,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: this.configService.get('ACCESS_JWT_SECRET'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: this.configService.get('REFRESH_JWT_SECRET'),
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: this.configService.get('ACCESS_JWT_SECRET'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_JWT_SECRET'),
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
