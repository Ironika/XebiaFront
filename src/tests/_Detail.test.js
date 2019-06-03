import React from 'react';
import { shallow, mount } from 'enzyme'
import Detail from '../components/Books/Detail';
import MockedBooksFiltered from './mockedBooksFiltered'


describe('Detail', () => {
  it('renders without crashing', () => {
    const add = jest.fn();
    const onClick = jest.fn();
    shallow(<Detail book={MockedBooksFiltered[0]} add={add} back={onClick}/>)
  })

  it('renders infos', async () => {
    const add = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(<Detail book={MockedBooksFiltered[0]} add={add} back={onClick}/>)
    expect(wrapper.props().book.title).toEqual("Henri Potier et la Chambre des secrets")
    expect(wrapper.props().book.price).toEqual(30)
    expect(wrapper.props().book.cover).toEqual("http://henri-potier.xebia.fr/hp1.jpg")
    expect(wrapper.props().book.isbn).toEqual("a460afed-e5e7-4e39-a39d-c885c05db861")
    expect(wrapper.props().book.synopsis).toEqual([
      "Henri Potier passe l'été chez les Dursley et reçoit la visite de Dobby, un elfe de maison. Celui-ci vient l'avertir que des évènements étranges vont bientôt se produire à Poudlard et lui conseille donc vivement de ne pas y retourner. Henri choisit d'ignorer cet avertissement. Le jour de son départ pour l'école, il se retrouve bloqué avec Ron Weasley à la gare de King's Cross, sans pouvoir se rendre sur le quai 9 ¾ où les attend le Poudlard Express. En dernier recours, les garçons se rendent donc à Poudlard à l'aide de la voiture volante de Monsieur Weasley et manquent de peu de se faire renvoyer dès leur arrivée à l'école pour avoir été aperçus au cours de leur voyage par plusieurs moldus.",
      "Le nouveau professeur de défense contre les forces du mal, Gilderoy Lockhart, se montre particulièrement narcissique et inefficace. Pendant ce temps, Henri entend une voix étrange en parcourant les couloirs du château, systématiquement associée à la pétrification immédiate d'un élève moldu de l'école. Dès la première attaque, un message sanglant apparaît sur l'un des murs, informant que la Chambre des secrets a été ouverte. Dumbledore et les autres professeurs (ainsi que Henri, Ron et Hermione) doivent prendre les mesures nécessaires pour trouver l'identité du coupable et protéger les élèves contre de nouvelles agressions."
    ])
  })
})
