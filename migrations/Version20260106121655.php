<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260106121655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE graphique (id INT AUTO_INCREMENT NOT NULL, type VARCHAR(255) NOT NULL, id_donnees_id INT NOT NULL, id_section_id INT DEFAULT NULL, INDEX IDX_C352BAB8EA5FF26B (id_donnees_id), UNIQUE INDEX UNIQ_C352BAB87DA963AD (id_section_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE variable (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, id_donnees_id INT NOT NULL, INDEX IDX_CC4D878DEA5FF26B (id_donnees_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE graphique ADD CONSTRAINT FK_C352BAB8EA5FF26B FOREIGN KEY (id_donnees_id) REFERENCES jeu_donnee (id)');
        $this->addSql('ALTER TABLE graphique ADD CONSTRAINT FK_C352BAB87DA963AD FOREIGN KEY (id_section_id) REFERENCES section (id)');
        $this->addSql('ALTER TABLE variable ADD CONSTRAINT FK_CC4D878DEA5FF26B FOREIGN KEY (id_donnees_id) REFERENCES jeu_donnee (id)');
        $this->addSql('ALTER TABLE graphique_variable ADD CONSTRAINT FK_7531FE83158269C3 FOREIGN KEY (id_graphique_id) REFERENCES graphique (id)');
        $this->addSql('ALTER TABLE graphique_variable ADD CONSTRAINT FK_7531FE83EB11B379 FOREIGN KEY (id_variable_id) REFERENCES variable (id)');
        $this->addSql('ALTER TABLE section CHANGE ordre ordre INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE graphique DROP FOREIGN KEY FK_C352BAB8EA5FF26B');
        $this->addSql('ALTER TABLE graphique DROP FOREIGN KEY FK_C352BAB87DA963AD');
        $this->addSql('ALTER TABLE variable DROP FOREIGN KEY FK_CC4D878DEA5FF26B');
        $this->addSql('DROP TABLE graphique');
        $this->addSql('DROP TABLE variable');
        $this->addSql('ALTER TABLE graphique_variable DROP FOREIGN KEY FK_7531FE83158269C3');
        $this->addSql('ALTER TABLE graphique_variable DROP FOREIGN KEY FK_7531FE83EB11B379');
        $this->addSql('ALTER TABLE section CHANGE ordre ordre INT NOT NULL');
    }
}
