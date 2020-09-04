import {Table, MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CreateTransaction1599007354406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'value',
                    type: 'decimal',
                    precision: 10, // nosso valor pode ter 10 digitos do lado esquerdo
                    scale: 2, // 2 digitos do nosso lado direito
                },
                {
                    name: 'type',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))

       
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions')
    }

}
