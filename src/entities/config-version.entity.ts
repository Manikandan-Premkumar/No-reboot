import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('config_versions')
export class ConfigVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  configId: string;

  @Column({ type: 'jsonb' })
  value: any;

  @Column({ type: 'int' })
  version: number;

  @Column({ nullable: true })
  changedBy: string;

  @Column({ nullable: true })
  changeReason: string;

  @CreateDateColumn()
  changedAt: Date;
}