import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import FartScroll from '../index';

storiesOf('FartScroll', module)
  .add('Default', () => {
    const scrollers = [];
    let x = 0;
    while (x < 300) {
      x += 1;
      scrollers.push(<div key={x}>pffft</div>);
    }

    return (
      <div>
        <FartScroll />
        {scrollers}
      </div>
    );
  }
  )
  .add('Only resize enabled.', () => (
    <div>
      <FartScroll scrollFart={false} />
    </div>
  ))
  .add('Only scroller enabled', () => {
    const scrollers = [];
    let x = 0;
    while (x < 300) {
      x += 1;
      scrollers.push(<div key={x}>pffft</div>);
    }

    return (
      <div>
        <FartScroll resizeFart={false} />
        {scrollers}
      </div>
    );
  }
  )
  .add('Custom Trigger Distance', () => {
    const scrollers = [];
    let x = 0;
    while (x < 300) {
      x += 1;
      scrollers.push(<div key={x}>pffft</div>);
    }

    return (
      <div>
        <FartScroll triggerDistance={10} resizeFart={false} />
        {scrollers}
      </div>
    );
  }
  );
