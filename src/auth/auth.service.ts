import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    
    await this.userRepository.save(user);
    return { message: 'User created successfully' };
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    
    return { access_token: token };
  }
}