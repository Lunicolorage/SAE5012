<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260120081623 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE graphique ADD title VARCHAR(255) NOT NULL, ADD labels JSON NOT NULL, ADD datasets JSON NOT NULL, ADD options JSON DEFAULT NULL');
        $this->addSql('ALTER TABLE jeu_donnee ADD nom VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE variable ADD valeurs JSON DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE graphique DROP title, DROP labels, DROP datasets, DROP options');
        $this->addSql('ALTER TABLE jeu_donnee DROP nom');
        $this->addSql('ALTER TABLE variable DROP valeurs');
    }
}
