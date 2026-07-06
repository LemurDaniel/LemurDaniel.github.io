import React from 'react'


const Impressum = () => {

  return (
    <div className="p-10 md:p-20 py-24">


      <div className="text-white mx-auto">
        <h1 className="text-xl underline pb-2">Impressum:</h1>

        <p>Diese Website ist ein rein privates Projekt ohne jeglichen kommerziellen Nutzen und unterliegt daher nach dem
          <a href="https://www.gesetze-im-internet.de/ddg/__5.html" className="hover:underline italic"> Digitale-Dienste-Gesetz (DDG) § 5 Allgemeine Informationspflichten </a>
          keinen impressumspflichtigen Angaben.
        </p>

      </div>

      <div className="text-white mx-auto mt-10">
        <h1 className="text-xl underline pb-2">Credits:</h1>

        <p>
          Alle verwendeted Sounds im Spaceship-Spiel sind aus <a href="https://freesound.org/" >Freesounds.org</a> entnommen.
        </p>

        <ul className="list-disc pl-5 py-5 links">
          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/bubaproducer/sounds/151025/" >ship_laser</a> von <a href="https://freesound.org/people/bubaproducer/" >bubaproducer</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/StormwaveAudio/sounds/330629/" >ship_impact</a> von <a href="https://freesound.org/people/StormwaveAudio/" >StormwaveAudio</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/MATRIXXX_/sounds/515123/" >ship_thrust</a> von <a href="https://freesound.org/people/MATRIXXX_/" >MATRIXXX_</a> </p>
          </li>


          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/runningmind/sounds/387857/" >asteroid_explosion</a> von <a href="https://freesound.org/people/runningmind/" >runningmind</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/afleetingspeck/sounds/232444/" >game_over</a> von <a href="https://freesound.org/people/afleetingspeck/" >afleetingspeck</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/LittleRobotSoundFactory/sounds/270402/" >highscore</a> von <a href="https://freesound.org/people/LittleRobotSoundFactory/" >LittleRobotSoundFactory</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/ldf99/sounds/586467/" >pen_brush</a> von <a href="https://freesound.org/people/ldf99/" >ldf99</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/123jorre456/sounds/46627/" >pen_erase</a> von <a href="https://freesound.org/people/123jorre456/" >123jorre456</a> </p>
          </li>

          <li className="py-1 border-b rounded-sm border-gray-600">
            <p> <a href="https://freesound.org/people/Phil25/sounds/202909/" >button_click</a> von <a href="https://freesound.org/people/Phil25/" >Phil25</a> </p>
          </li>
        </ul>

      </div>


    </div>

  )
}

export default Impressum
