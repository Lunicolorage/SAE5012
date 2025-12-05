<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251205143302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE titre (id INT AUTO_INCREMENT NOT NULL, hierarchie VARCHAR(255) NOT NULL, texte LONGTEXT NOT NULL, section_id INT NOT NULL, UNIQUE INDEX UNIQ_FF7747B4D823E37A (section_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE titre ADD CONSTRAINT FK_FF7747B4D823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE titre DROP FOREIGN KEY FK_FF7747B4D823E37A');
        $this->addSql('DROP TABLE titre');
    }
}
