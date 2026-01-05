<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251219101221 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE graphique_variable (id INT AUTO_INCREMENT NOT NULL, couleur VARCHAR(255) NOT NULL, id_graphique_id INT NOT NULL, id_variable_id INT NOT NULL, INDEX IDX_7531FE83158269C3 (id_graphique_id), INDEX IDX_7531FE83EB11B379 (id_variable_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE graphique_variable ADD CONSTRAINT FK_7531FE83158269C3 FOREIGN KEY (id_graphique_id) REFERENCES graphique (id)');
        $this->addSql('ALTER TABLE graphique_variable ADD CONSTRAINT FK_7531FE83EB11B379 FOREIGN KEY (id_variable_id) REFERENCES variable (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE graphique_variable DROP FOREIGN KEY FK_7531FE83158269C3');
        $this->addSql('ALTER TABLE graphique_variable DROP FOREIGN KEY FK_7531FE83EB11B379');
        $this->addSql('DROP TABLE graphique_variable');
    }
}
