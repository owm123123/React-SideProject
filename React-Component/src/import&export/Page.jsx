import React from 'react';

// show export custom
import { apiKey, abc as test } from './util';

// show export default
import util from './util';

import * as utilAll from './util';

const Page = () => {
  return (
    <>
      <h1>custom data</h1>
      <ul>
        <li>
          <span>{apiKey}</span>
        </li>
        <li>
          <span>{test}</span>
        </li>
      </ul>

      <h1>util data</h1>
      <ul>
        <li>{util}</li>
      </ul>

      <h1>util all data</h1>
      <ul>
        <li>
          <span>{utilAll.default}</span>
        </li>
        <li>
          <span>{utilAll.apiKey}</span>
        </li>
        <li>
          <span>{utilAll.abc}</span>
        </li>
      </ul>
    </>
  );
};

export default Page;
