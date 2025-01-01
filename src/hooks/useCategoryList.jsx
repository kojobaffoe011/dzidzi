import pizza from "../assets/images/icons/pizza.png";
import desert from "../assets/images/icons/desert.png";
import beverage from "../assets/images/icons/beverage.png";
import salad from "../assets/images/icons/salad.png";
import sandwich from "../assets/images/icons/sandwich.png";
import soup from "../assets/images/icons/soup.png";
import pasta from "../assets/images/icons/pasta.png";
import appetizer from "../assets/images/icons/appetizer.png";
import vegan from "../assets/images/icons/vegan.png";
import cake from "../assets/images/icons/cake.png";
import fish from "../assets/images/icons/fish.png";
import sushi from "../assets/images/icons/sushi.png";
import chickenwing from "../assets/images/icons/chicken-wings.png";
import burger from "../assets/images/icons/burger.png";
import breakfast from "../assets/images/icons/breakfast.png";
import kebab from "../assets/images/icons/kebab.png";
import shrimp from "../assets/images/icons/shrimp.png";
import asianfood from "../assets/images/icons/asian-food.png";
import mexicanfood from "../assets/images/icons/mexican-food.png";
import italianfood from "../assets/images/icons/italian-food.png";
import chinesefood from "../assets/images/icons/chinese-food.png";
import vietnamesefood from "../assets/images/icons/vietnamese-food.png";
import japanesefood from "../assets/images/icons/japanese-food.png";

export const useCategoryList = () => {
  const categories = [
    {
      label: "Pizza",
      value: "PIZZA",
      icon: pizza,
      color: "bg-red-100",
      text: "text-red-500",
    },
    {
      label: "Desert",
      value: "DESSERT",
      icon: desert,
      color: "bg-orange-100",
      text: "text-orange-500",
    },
    {
      label: "Beverage",
      value: "BEVERAGE",
      icon: beverage,
      color: "bg-amber-100",
      text: "text-amber-500",
    },
    {
      label: "Salad",
      value: "SALAD",
      icon: salad,
      color: "bg-yellow-100",
      text: "text-amber-500",
    },
    {
      label: "Sandwich",
      value: "SANDWICH",
      icon: sandwich,
      color: "bg-lime-100",
      text: "text-lime-500",
    },
    {
      label: "Soup",
      value: "SOUP",
      icon: soup,
      color: "bg-green-100",
      text: "text-green-500",
    },
    {
      label: "Pasta",
      value: "PASTA",
      icon: pasta,
      color: "bg-emerald-100",
      text: "text-emerald-500",
    },
    {
      label: "Appetizer",
      value: "APPETIZER",
      icon: appetizer,
      color: "bg-teal-100",
      text: "text-teal-500",
    },
    {
      label: "Vegan",
      value: "VEGAN",
      icon: vegan,
      color: "bg-cyan-100",
      text: "text-cyan-500",
    },
    {
      label: "Cake",
      value: "CAKE",
      icon: cake,
      color: "bg-sky-100",
      text: "text-sky-500",
    },
    {
      label: "Fish",
      value: "FISH",
      icon: fish,
      color: "bg-blue-100",
      text: "text-blue-500",
    },
    {
      label: "Sushi",
      value: "SUSHI",
      icon: sushi,
      color: "bg-indigo-100",
      text: "text-indigo-500",
    },
    {
      label: "Wings",
      value: "CHICKEN_WING",
      icon: chickenwing,
      color: "bg-violet-100",
      text: "text-violet-500",
    },
    {
      label: "Burger",
      value: "BURGER",
      icon: burger,
      color: "bg-purple-100",
      text: "text-purple-500",
    },
    {
      label: "Breakfast",
      value: "BREAKFAST",
      icon: breakfast,
      color: "bg-fuchsia-100",
      text: "text-fuchsia-500",
    },
    {
      label: "Kebab",
      value: "KEBAB",
      icon: kebab,
      color: "bg-pink-100",
      text: "text-pink-500",
    },
    {
      label: "Shrimp",
      value: "SHRIMP",
      icon: shrimp,
      color: "bg-rose-100",
      text: "text-rose-500",
    },
    {
      label: "Asian",
      value: "ASIAN_FOOD",
      icon: asianfood,
      color: "bg-stone-100",
      text: "text-stone-500",
    },
    {
      label: "Mexican",
      value: "MEXICAN_FOOD",
      icon: mexicanfood,
      color: "bg-slate-100",
      text: "text-slate-500",
    },
    {
      label: "Italian",
      value: "ITALIAN_FOOD",
      icon: italianfood,
      color: "bg-neutral-100",
      text: "text-neutral-500",
    },
    {
      label: "Chinese",
      value: "CHINESE",
      icon: chinesefood,
      color: "bg-slate-100",
      text: "text-slate-500",
    },
    {
      label: "Vietnamese",
      value: "VIETNAMESE_FOOD",
      icon: vietnamesefood,
      color: "bg-zinc-100",
      text: "text-zinc-500",
    },
    {
      label: "Japanese",
      value: "JAPANESE_FOOD",
      icon: japanesefood,
      color: "bg-gray-100",
      text: "text-gray-500",
    },
  ];

  return { categories };
};
