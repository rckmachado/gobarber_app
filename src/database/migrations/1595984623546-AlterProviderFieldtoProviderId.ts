import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldtoProviderId1595984623546
    implements MigrationInterface {
    // eslint-disable-next-line class-methods-use-this
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(_queryRunner: QueryRunner): Promise<void> {
        await _queryRunner.dropForeignKey(
            'appointments',
            'AppointmentsProvider',
        );

        await _queryRunner.dropColumn('appointments', 'provider_id');

        await _queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
