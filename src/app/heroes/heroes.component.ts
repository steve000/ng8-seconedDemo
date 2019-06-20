import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  // heroes = HEROES;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  // 模拟数据
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // 采用service
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();  // 同步
    // Observable

    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
