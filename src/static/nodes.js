import RootDescription from 'static/descriptions/root.md';
import AboutDescription from 'static/descriptions/about.md';
import CodeDescription from 'static/descriptions/code.md';
import DragonPopDescription from 'static/descriptions/dragon-pop.md';
import MoradoDescription from 'static/descriptions/morado.md';
import AddebeatsDescription from 'static/descriptions/addebeats.md';
import JogLogDescription from 'static/descriptions/joglog.md';
import NotCodeDescription from 'static/descriptions/not-code.md';
import BreadDescription from 'static/descriptions/bread.md';
import BeerDescription from 'static/descriptions/beer.md'
import ResumeDescription from 'static/descriptions/resume.md'

export default {
  name: "Billy Littlefield",
  image: "portrait.png",
  description: RootDescription,
  links: [],
  images: [],
  children: [
    {
      name: "About",
      description: AboutDescription,
      children: [{
        name: "Bio"
      },{
        name: "Résumé",
        description: ResumeDescription,
        image: 'resume.png',
        links: [
          { text: 'Download', url: 'src/resume.pdf', download: true }
        ]
      },{
        name: "Contact"
      }]
    },
    {
      name: "Code",
      description: CodeDescription,
      image: 'code.png',
      children: [{
        name: "Dragon Pop",
        description: DragonPopDescription,
        image: 'dragon-pop.png',
        images: [],
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/dragon-pop/" },
          { text: "Live", url: "https://www.billylittlefield.com/dragon-pop/" }
        ]
      },{
        name: "JogLog",
        description: JogLogDescription,
        image: 'joglog.png',
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/JogLog/" },
          { text: "Live", url: "https://thejoggerlogger.herokuapp.com/" }
        ]
      },{
        name: "Adde- beats",
        image: "addebeats.png",
        description: AddebeatsDescription,
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/addebeats/" },
          { text: "Live", url: "https://www.billylittlefield.com/addebeats/" }
        ]
      },{
        name: "Morado",
        description: MoradoDescription,
        image: 'morado.jpeg',
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/Morado/" },
        ]
      }]
    },
    {
      name: "Not Code",
      description: NotCodeDescription,
      image: 'not-code.png',
      children: [{
        name: "Bread",
        description: BreadDescription,
        image: 'bread.png',
      },{
        name: "Beer",
        description: BeerDescription,
        image: 'beer.png'
      }]
    }
  ]
};
