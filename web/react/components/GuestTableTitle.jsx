import { React } from 'react';

export default class GuestTableTitle extends React.Component {

  render() {
    return (

			<thead>
        <tr>
          <th>Guest</th>
          <th>Waited
            <span className="greyText">/ Quoted</span>
          </th>
          <th> </th>
          <th> </th>
        </tr>
			</thead>

    );
  }
}

