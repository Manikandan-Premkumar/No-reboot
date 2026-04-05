import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('configs')
export class Config {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({ type: 'jsonb' })
  value: any;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'service' })
  scope: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


}