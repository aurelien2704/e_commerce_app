'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, LogOut, Menu, Package, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Liens de navigation principaux */
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/products" },
  { label: "Contact", href: "/contact" },
];

/**
 * Génère les initiales d'un utilisateur à partir de son prénom et nom
 * Ex: "John Doe" → "JD"
 */
function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

/**
 * Barre de navigation principale — responsive, avec menu utilisateur et badge panier
 */
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          MonShop
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href
                ? "text-primary"
                : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center gap-2">

          {/* Icône panier avec badge */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />

              <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
              >0
              </Badge>
            </Link>
          </Button>

          {/* Menu utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john.doe@example.com</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Mon compte
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/orders" className="flex items-center gap-2 cursor-pointer">
                  <Package className="h-4 w-4" />
                  Mes commandes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account/wishlist" className="flex items-center gap-2 cursor-pointer">
                  <Heart className="h-4 w-4" />
                  Ma wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">S'inscrire</Link>
            </Button>
          </div>
        </div>

        {/* Bouton burger mobile */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
              >
                0
              </Badge>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t pt-4 flex flex-col gap-2">

            <>
              <p className="text-sm font-medium">John Doe</p>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
              >
                <User className="h-4 w-4" /> Mon compte
              </Link>
              <Link
                href="/account/orders"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
              >
                <Package className="h-4 w-4" /> Mes commandes
              </Link>
              <Link
                href="/account/wishlist"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
              >
                <Heart className="h-4 w-4" /> Ma wishlist
              </Link>
              <button
                className="text-sm text-destructive hover:text-destructive/80 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </>

            <>
              <Button variant="outline" asChild className="w-full">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Connexion
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  S'inscrire
                </Link>
              </Button>
            </>

          </div>
        </div>
      )}
    </header>
  );
}