import React from 'react';
// import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import FartScroll from '../index';

const { describe, it } = global;

describe('FartScroll', () => {
  it('should render an audio element', () => {
    const wrapper = shallow(<FartScroll />);
    expect(wrapper.node.type).to.be.equal('audio');
  });

  it('should get props or something', () => {
    const wrapper = mount(<FartScroll scrollFart resizeFart={false} scrollDistance={100} />);
    expect(wrapper.node.props.scrollFart).to.be.equal(true);
    expect(wrapper.node.props.resizeFart).to.be.equal(false);
    expect(wrapper.node.props.scrollDistance).to.be.equal(100);
  });
});
