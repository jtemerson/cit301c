import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'test',
      'this is a test',
      'http://assets-jpcust.jwpsrv.com/thumbs/Klop5Noi-720.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('french fries', 20)
      ]),
    new Recipe(
      'another test',
      'this is a test',
      'http://assets-jpcust.jwpsrv.com/thumbs/Klop5Noi-720.jpg',
      [
        new Ingredient('buns', 2)
        ,new Ingredient('meat', 1)
      ]),
  ];

  constructor(private slService: ShoppingListService){

  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
