<?php

namespace App\Entity;

use App\Repository\JeuDonneeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource] 
#[ORM\Entity(repositoryClass: JeuDonneeRepository::class)]
class JeuDonnee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'jeuDonnees')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user = null;

    #[ORM\Column(length: 255)]
    private ?string $lien = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    /**
     * @var Collection<int, Variable>
     */
    #[ORM\OneToMany(targetEntity: Variable::class, mappedBy: 'idDonnees', orphanRemoval: true)]
    private Collection $variables;

    /**
     * @var Collection<int, Graphique>
     */
    #[ORM\OneToMany(targetEntity: Graphique::class, mappedBy: 'idDonnees', orphanRemoval: true)]
    private Collection $graphiques;

    public function __construct()
    {
        $this->variables = new ArrayCollection();
        $this->graphiques = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getLien(): ?string
    {
        return $this->lien;
    }

    public function setLien(string $lien): static
    {
        $this->lien = $lien;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, Variable>
     */
    public function getVariables(): Collection
    {
        return $this->variables;
    }

    public function addVariable(Variable $variable): static
    {
        if (!$this->variables->contains($variable)) {
            $this->variables->add($variable);
            $variable->setIdDonnees($this);
        }

        return $this;
    }

    public function removeVariable(Variable $variable): static
    {
        if ($this->variables->removeElement($variable)) {
            // set the owning side to null (unless already changed)
            if ($variable->getIdDonnees() === $this) {
                $variable->setIdDonnees(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Graphique>
     */
    public function getGraphiques(): Collection
    {
        return $this->graphiques;
    }

    public function addGraphique(Graphique $graphique): static
    {
        if (!$this->graphiques->contains($graphique)) {
            $this->graphiques->add($graphique);
            $graphique->setIdDonnees($this);
        }

        return $this;
    }

    public function removeGraphique(Graphique $graphique): static
    {
        if ($this->graphiques->removeElement($graphique)) {
            // set the owning side to null (unless already changed)
            if ($graphique->getIdDonnees() === $this) {
                $graphique->setIdDonnees(null);
            }
        }

        return $this;
    }
}
