import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
// components
import ImgWrapper from './image'
import { P3 } from '../../text/paragraph'
// constants
import mockup from '../constants/mockup-spec'
// @twreporter
import entityPaths from '@twreporter/core/lib/constants/entity-path'
import mq from '@twreporter/core/lib/utils/media-query'
import { fontWeight, fontFamily } from '@twreporter/core/lib/constants/font'
import {
  colorGrayscale,
  colorBrand,
} from '@twreporter/core/lib/constants/color'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

const _ = {
  forEach,
  get,
}

const Container = styled.div`
  width: ${mockup.hd.cardWidth}px;
  ${mq.desktopOnly`
    width: ${mockup.desktop.cardWidth}px;
  `}
  ${mq.tabletOnly`
    width: ${mockup.tablet.cardWidth}px;
  `}
  ${mq.mobileOnly`
    width: 100%;
  `}

  a {
    color: ${colorGrayscale.gray900};
  }
`

const HoverEffect = styled.div`
  opacity: 1;
  ${mq.tabletAndAbove`
    &:hover {
      opacity: 0.7;
    }
    transition: 200ms opacity linear;
  `}
`

const ImgFrame = styled.div`
  height: ${mockup.hd.imgHeight}px;
  ${mq.desktopOnly`
    height: ${mockup.desktop.imgHeight}px;
  `}
  ${mq.tabletOnly`
    height: ${mockup.tablet.imgHeight}px;
  `}
  ${mq.mobileOnly`
    height: ${mockup.mobile.imgHeight}px;
  `}
`

const TextBlock = styled.div`
  width: ${(mockup.desktop.textWidth / mockup.desktop.cardWidth) * 100}%;
  margin: 12px auto 0 auto;
  cursor: pointer;
  ${mq.mobileOnly`
    width: 100%;
  `}
`

const Category = styled.div`
  color: ${colorBrand.heavy};
  font-size: 12px;
  line-height: 1.33;
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.title};
  line-height: 1.4;
  color: ${colorGrayscale.gray800};
  margin-bottom: 10px;
`

const Desc = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  padding-bottom: 16px;
  color: ${colorGrayscale.gray800};
`

const Tags = styled.div`
  width: 100%;
  margin-top: 32px;
  margin-bottom: 40px;
  padding-left: 15px;
  line-height: 1;

  ${mq.mobileOnly`
    padding-left: 0;
  `}
`

const PubDate = styled.div`
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  right: 0;
`

const Tag = styled(P3)`
  background-color: ${(props) => {
    return props.$selected ? colorBrand.heavy : colorGrayscale.gray100
  }};
  border: 1px solid ${colorBrand.heavy};
  border-radius: 68px;
  color: ${(props) => {
    return props.$selected ? colorGrayscale.white : colorBrand.heavy
  }};
  display: inline-block;
  text-decoration: none;
  line-height: 1.45;
  font-size: 12px;
  font-weight: ${fontWeight.bold};
  padding: 2px 10px;
  margin-right: 8px;
  margin-bottom: 10px;
`

class ListItem extends PureComponent {
  render() {
    const { title, desc, img, link, category, tags, pubDate } = this.props
    const tagsJSX = []
    _.forEach(tags, (tag) => {
      const id = _.get(tag, 'id')
      const name = _.get(tag, 'name')
      if (id && name) {
        tagsJSX.push(
          <Link key={id} to={entityPaths.tag + id}>
            <Tag $selected={_.get(tag, 'selected')}>{name}</Tag>
          </Link>
        )
      }
    })
    return (
      <Container>
        <Link {...link}>
          <HoverEffect>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(img, 'alt', '')}
                src={_.get(img, 'src', '')}
              />
            </ImgFrame>
            <TextBlock>
              <Category>{category}</Category>
              <Title>{title}</Title>
              <Desc>
                {desc}
                <PubDate>{pubDate}</PubDate>
              </Desc>
            </TextBlock>
          </HoverEffect>
        </Link>
        <Tags>{tagsJSX}</Tags>
      </Container>
    )
  }
}

ListItem.defaultProps = {
  tags: [],
  link: {
    to: '',
    target: '',
  },
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
  }),
  category: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ),
}

export default ListItem
