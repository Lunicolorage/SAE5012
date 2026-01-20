<?php

namespace App\EventListener;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: User::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: User::class)]
final class PasswordHashingListener
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher) {}

    public function prePersist(User $user, PrePersistEventArgs $event): void
    {
        $this->hashPassword($user);
        if (empty($user->getRoles()) || $user->getRoles() === ['ROLE_USER']) {
            $user->setRoles(['ROLE_USER']);
        }
    }

    //ajout du role ROLE_USER automatique a la création d'un utilisateur

    public function preUpdate(User $user, PreUpdateEventArgs $event): void
    {
        $this->hashPassword($user);
        $event->recomputeChangeSets();
    }

    private function hashPassword(User $user): void
    {
        $password = $user->getPassword();
        if ($password && !str_starts_with($password, '$2y$')) {
            $user->setPassword(
                $this->passwordHasher->hashPassword($user, $password)
            );
        }
    }

    // hashage du mot de passe a la création d'un utilisateur
}