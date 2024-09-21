import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  albumName!: string;

  @Column()
  artist!: string;

  @Column()
  year!: string;

  @Column('text')
  review!: string;

  @Column({ default: '★★★' }) // Define um valor padrão para rating
  rating!: string;
}