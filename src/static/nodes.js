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
import ContactDescription from 'static/descriptions/contact.md'

export default {
  name: "Billy Littlefield",
  image: "portrait.png",
  description: RootDescription,
  linksBelow: true,
  links: [
    { text: "Code", action: "selectNode", payload: "Code" },
    { text: "Not Code", action: "selectNode", payload: "Not Code"},
    { text: "Résumé", action: "selectNode", payload: "Résumé"},
    { text: "Contact", action: "selectNode", payload: "Contact" }
  ],
  images: [
    { src: 'src/images/portrait/portrait-1.jpg' },
    { src: 'src/images/portrait/portrait-2.jpg', style: { objectPosition: "0 20%" } },
    { src: 'src/images/portrait/portrait-3.jpg' }
  ],
  children: [
    {
      name: "About",
      description: AboutDescription,
      linksBelow: true,
      links: [
        { text: 'Résumé', action: "selectNode", payload: 'Résumé' },
        { text: 'Contact', action: "selectNode", payload: 'Contact' },
        { text: 'Github', href: 'https://github.com/billylittlefield' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/in/billylittlefield' },
      ],
      children: [{
        name: "Résumé",
        description: ResumeDescription,
        image: 'resume.png',
        links: [
          { text: 'Download', url: 'src/resume.pdf', download: true }
        ]
      },{
        name: "Contact",
        image: 'contact.jpg',
        description: ContactDescription,
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
        images: [
          { src: 'src/images/dragon-pop/dragon-pop-1.png' },
          { src: 'src/images/dragon-pop/dragon-pop-2.png' },
          { src: 'src/images/dragon-pop/dragon-pop-3.png' }
        ],
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/dragon-pop/" },
          { text: "Live", url: "https://www.billylittlefield.com/dragon-pop/" }
        ]
      },{
        name: "JogLog",
        description: JogLogDescription,
        image: 'joglog.png',
        images: [
          { src: 'src/images/joglog/joglog-1.png' },
          { src: 'src/images/joglog/joglog-2.png' },
          { src: 'src/images/joglog/joglog-3.png' }
        ],
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/JogLog/" },
          { text: "Live", url: "https://thejoggerlogger.herokuapp.com/" }
        ]
      },{
        name: "Adde- beats",
        title: "Addebeats",
        image: "addebeats.png",
        description: AddebeatsDescription,
        images: [
          { src: 'src/images/adde-beats/adde-beats-1.png' },
          { src: 'src/images/adde-beats/adde-beats-2.png' },
          { src: 'src/images/adde-beats/adde-beats-3.png' }
        ],
        links: [
          { text: "Github", url: "https://github.com/billylittlefield/addebeats/" },
          { text: "Live", url: "https://www.billylittlefield.com/addebeats/" }
        ]
      },{
        name: "Morado",
        description: MoradoDescription,
        image: 'morado.jpeg',
        images: [
          { src: 'src/images/morado/morado-1.png' },
          { src: 'src/images/morado/morado-2.png' },
          { src: 'src/images/morado/morado-3.png' }
        ],
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
