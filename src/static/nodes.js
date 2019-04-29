import RootDescription from 'static/descriptions/root.md';
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
  links: [
    { text: "Code Stuff", action: "selectNode", payload: "Code Stuff" },
    { text: "Other Stuff", action: "selectNode", payload: "Other Stuff"},
    { text: 'Résumé', url: 'src/littlefield-resume.pdf' },
    { text: 'LinkedIn', url: 'https://www.linkedin.com/in/billylittlefield' },
    { text: 'Github', url: 'https://github.com/billylittlefield' },
    { text: "Contact", action: "selectNode", payload: "Contact" },
  ],
  images: [
    { src: 'images/portrait/portrait-1.jpg' },
    { src: 'images/portrait/portrait-2.jpg', style: { objectPosition: "0 20%" } },
    { src: 'images/portrait/portrait-3.jpg' }
  ],
  children: [
    {
      name: "Résumé",
      description: ResumeDescription,
      image: 'resume.png',
      links: [
        { text: 'Back', action: 'selectNode', payload: 'Billy Littlefield' },
        { text: 'Download', url: 'src/littlefield-resume.pdf', download: true }
      ]
    },{
      name: "Contact",
      image: 'contact.jpg',
      description: ContactDescription,
    },
    {
      name: "Code Stuff",
      description: CodeDescription,
      image: 'code.png',
      links: [
        { text: 'Back', action: 'selectNode', payload: 'Billy Littlefield' },
        { text: 'Dragon Pop', action: 'selectNode', payload: 'Dragon Pop' },
        { text: 'Addebeats', action: 'selectNode', payload: 'Adde- beats' },
        { text: 'JogLog', action: 'selectNode', payload: 'JogLog' },
        { text: 'Morado', action: 'selectNode', payload: 'Morado' },
      ],
      children: [{
        name: "Dragon Pop",
        description: DragonPopDescription,
        image: 'dragon-pop.png',
        images: [
          { src: 'images/dragon-pop/dragon-pop-1.png' },
          { src: 'images/dragon-pop/dragon-pop-2.png' },
          { src: 'images/dragon-pop/dragon-pop-3.png' }
        ],
        links: [
          { text: 'Back', action: 'selectNode', payload: 'Code Stuff' },
          { text: "Github", url: "https://github.com/billylittlefield/dragon-pop/" },
          { text: "Live", url: "https://www.billylittlefield.com/dragon-pop/" }
        ]
      },{
        name: "JogLog",
        description: JogLogDescription,
        image: 'joglog.png',
        images: [
          { src: 'images/joglog/joglog-1.png' },
          { src: 'images/joglog/joglog-2.png' },
          { src: 'images/joglog/joglog-3.png' }
        ],
        links: [
          { text: 'Back', action: 'selectNode', payload: 'Code Stuff' },
          { text: "Github", url: "https://github.com/billylittlefield/JogLog/" },
          { text: "Live", url: "https://thejoggerlogger.herokuapp.com/" }
        ]
      },{
        name: "Adde- beats",
        title: "Addebeats",
        image: "addebeats.png",
        description: AddebeatsDescription,
        images: [
          { src: 'images/adde-beats/adde-beats-1.png' },
          { src: 'images/adde-beats/adde-beats-2.png' },
          { src: 'images/adde-beats/adde-beats-3.png' }
        ],
        links: [
          { text: 'Back', action: 'selectNode', payload: 'Code Stuff' },
          { text: "Github", url: "https://github.com/billylittlefield/addebeats/" },
          { text: "Live", url: "https://www.billylittlefield.com/addebeats/" }
        ]
      },{
        name: "Morado",
        description: MoradoDescription,
        image: 'morado.jpeg',
        images: [
          { src: 'images/morado/morado-1.png' },
          { src: 'images/morado/morado-2.png' },
          { src: 'images/morado/morado-3.png' }
        ],
        links: [
          { text: 'Back', action: 'selectNode', payload: 'Code Stuff' },
          { text: "Github", url: "https://github.com/billylittlefield/Morado/" },
        ]
      }]
    },
    {
      name: "Other Stuff",
      description: NotCodeDescription,
      image: 'not-code.png',
      links: [
        { text: 'Back', action: 'selectNode', payload: 'Billy Littlefield' },
        { text: 'Bread', action: 'selectNode', payload: 'Bread' },
        { text: 'Beer', action: 'selectNode', payload: 'Beer' },
      ],
      children: [{
        name: "Bread",
        description: BreadDescription,
        image: 'bread.png',
        links: [
          { text: 'Back', action: 'selectNode', payload: 'Other Stuff' },
        ],
        images: [
          { src: 'images/bread/bread-1.jpg'},
          { src: 'images/bread/bread-2.jpg' },
          { src: 'images/bread/bread-3.jpg' }
        ],
      },{
        name: "Beer",
        description: BeerDescription,
        image: 'beer.png',
        links: [
          { text: 'Back', action: 'selectNode', payload: 'Other Stuff' },
        ],
        images: [
          { src: 'images/beer/beer-1.jpg', style: { objectPosition: "0 20%" } },
          { src: 'images/beer/beer-2.jpg' },
          { src: 'images/beer/beer-3.jpg' },
          { src: 'images/beer/beer-4.gif' },
          { src: 'images/beer/beer-5.jpg' }
        ],
      }]
    }
  ]
};
