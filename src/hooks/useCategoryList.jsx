import pizza from '../assets/images/icons/pizza.png'
import desert from '../assets/images/icons/desert.png'
import beverage from '../assets/images/icons/beverage.png'
import salad from '../assets/images/icons/salad.png'
import sandwich from '../assets/images/icons/sandwich.png'
import soup from '../assets/images/icons/soup.png'
import pasta from '../assets/images/icons/pasta.png'
import appetizer from '../assets/images/icons/appetizer.png'
import vegan from '../assets/images/icons/vegan.png'
import cake from '../assets/images/icons/cake.png'
import fish from '../assets/images/icons/fish.png'
import sushi from '../assets/images/icons/sushi.png'
import chickenwing from '../assets/images/icons/chicken-wings.png'
import burger from '../assets/images/icons/burger.png'
import breakfast from '../assets/images/icons/breakfast.png'
import kebab from '../assets/images/icons/kebab.png'
import shrimp from '../assets/images/icons/shrimp.png'
import asianfood from '../assets/images/icons/asian-food.png'
import mexicanfood from '../assets/images/icons/mexican-food.png'
import italianfood from '../assets/images/icons/italian-food.png'
import chinesefood from '../assets/images/icons/chinese-food.png'
import vietnamesefood from '../assets/images/icons/vietnamese-food.png'
import japanesefood from '../assets/images/icons/japanese-food.png'


export const useCategoryList = () => {
const categories = [
  {
    name: 'Pizza',
    value: 'PIZZA',
    icon: pizza
  },
  {
    name: 'Desert',
    value: 'DESSERT',
    icon: desert
  },
  {
    name: 'Beverage',
    value: 'BEVERAGE',
    icon: beverage
  },
  {
    name: 'Salad',
    value: 'SALAD',
    icon: salad
  },
  {
    name: 'Sandwich',
    value: 'SANDWICH  ',
    icon: sandwich
  },
  {
    name: 'Soup',
    value: 'SOUP',
    icon: soup
  },
  {
    name: 'Pasta',
    value: 'PASTA',
    icon: pasta
  },
  {
    name: 'Appetizer',
    value: 'APPETIZER',
    icon: appetizer
  },
  {
    name: 'Vegan',
    value: 'VEGAN',
    icon: vegan
  },
  {
    name: 'Cake',
    value: 'CAKE',
    icon: cake
  },
  {
    name: 'Fish',
    value: 'FISH',
    icon:fish
  },
  {
    name: 'Sushi',
    value: 'SUSHI',
    icon: sushi
  },
  {
    name: 'Wings',
    value: 'CHICKEN_WING',
    icon: chickenwing
  },
  {
    name: 'Burger',
    value: 'BURGER',
    icon: burger
  },
  {
    name: 'Breakfast',
    value: 'BREAKFAST',
    icon: breakfast
  },
  {
    name: 'Kebab',
    value: 'KEBAB',
    icon: kebab
  },
  {
    name: 'Shrimp',
    value: 'SHRIMP',
    icon: shrimp
  },
  {
    name: 'Asian',
    value: 'ASIAN_FOOD',
    icon: asianfood
  },
  {
    name: 'Mexican',
    value: 'MEXICAN_FOOD',
    icon: mexicanfood
  },
  {
    name: 'Italian',
    value: 'ITALIAN_FOOD',
    icon: italianfood
  },
  {
    name: 'Chinese',
    value: 'CHINESE',
    icon: chinesefood
  },
  {
    name: 'Vietnamese',
    value: 'VIETNAMESE_FOOD',
    icon: vietnamesefood
  },
  {
    name: 'Japanese',
    value: 'JAPANESE_FOOD',
    icon: japanesefood
  },
]

  return { categories }
}
