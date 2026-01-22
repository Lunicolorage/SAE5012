<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260122153954 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Convertir la colonne couleur de VARCHAR vers JSON';
    }

    public function up(Schema $schema): void
    {
        // 1. Créer une nouvelle colonne temporaire de type JSON
        $this->addSql('ALTER TABLE graphique_variable ADD couleur_temp JSON DEFAULT NULL');
        
        // 2. Copier les données en les convertissant en tableau JSON
        $this->addSql('UPDATE graphique_variable SET couleur_temp = JSON_ARRAY(couleur)');
        
        // 3. Supprimer l'ancienne colonne
        $this->addSql('ALTER TABLE graphique_variable DROP COLUMN couleur');
        
        // 4. Renommer la nouvelle colonne
        $this->addSql('ALTER TABLE graphique_variable CHANGE couleur_temp couleur JSON NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // Pour revenir en arrière (optionnel)
        $this->addSql('ALTER TABLE graphique_variable ADD couleur_temp VARCHAR(255) DEFAULT NULL');
        $this->addSql('UPDATE graphique_variable SET couleur_temp = JSON_UNQUOTE(JSON_EXTRACT(couleur, "$[0]"))');
        $this->addSql('ALTER TABLE graphique_variable DROP COLUMN couleur');
        $this->addSql('ALTER TABLE graphique_variable CHANGE couleur_temp couleur VARCHAR(255) NOT NULL');
    }
}