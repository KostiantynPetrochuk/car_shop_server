import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfilesService } from '../profile/profiles.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly saltLength = 16;
  private readonly hashAlgorithm = 'sha256';
  constructor(
    private profilesService: ProfilesService,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 100000, 64, this.hashAlgorithm)
      .toString('hex');
  }

  generateSalt(): string {
    return crypto.randomBytes(this.saltLength).toString('hex');
  }

  async signUp(login: string, pwd: string): Promise<{ access_token: string }> {
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(login: string, pwd: string): Promise<{ access_token: string }> {
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
