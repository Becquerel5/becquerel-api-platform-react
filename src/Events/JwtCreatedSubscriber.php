<?php

namespace App\Events;

use App\Entity\User;
use App\Entity\Customer;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use DateTime;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class JwtCreatedSubscriber {
   
  
   public function updateJwtData(JWTCreatedEvent $event)
   {
       //1 take user firstname lastname
       $user = $event->getUser();
       //dd($user);
       //2enrich data pour contenir les donnes
       $data = $event->getData();
       $data['firstName'] = $user->getFirstName();
       $data['lastName'] = $user->getLastName();
       
       $event->setData($data);
       //dd($event->getData());
   }
  
}