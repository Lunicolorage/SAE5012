<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251205144101 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, url LONGTEXT NOT NULL, alt LONGTEXT NOT NULL, updated_at DATETIME NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('CREATE TABLE image_section (image_id INT NOT NULL, section_id INT NOT NULL, INDEX IDX_B8632D333DA5256D (image_id), INDEX IDX_B8632D33D823E37A (section_id), PRIMARY KEY (image_id, section_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE image_section ADD CONSTRAINT FK_B8632D333DA5256D FOREIGN KEY (image_id) REFERENCES image (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE image_section ADD CONSTRAINT FK_B8632D33D823E37A FOREIGN KEY (section_id) REFERENCES section (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image_section DROP FOREIGN KEY FK_B8632D333DA5256D');
        $this->addSql('ALTER TABLE image_section DROP FOREIGN KEY FK_B8632D33D823E37A');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE image_section');
    }
}
