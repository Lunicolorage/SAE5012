<?php
namespace App\EventListener;

use App\Entity\Article;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Symfony\Bundle\SecurityBundle\Security;

#[AsEntityListener(event: Events::prePersist, entity: Article::class)]
class ArticleCreatedNotifier
{

    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    public function prePersist(Article $article, LifecycleEventArgs $args): void
    {
        $article->setCreatedAt(new \DateTimeImmutable());
        $user = $this->security->getUser();
        $article->setUser($user);
        error_log('Article created with ID: ' . $article->getId());
    }
}
