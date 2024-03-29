import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity() //define as table
export class Teacher {

    @PrimaryGeneratedColumn('uuid') //gives unique id
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column({nullable: true})
    profile:string

    @DeleteDateColumn()
    deleteDate: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    
}
