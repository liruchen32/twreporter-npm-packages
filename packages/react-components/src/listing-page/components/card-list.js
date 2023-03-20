import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// components
import { ArticleCard } from '../../card'
import FetchingWrapper from '../../is-fetching-wrapper'
import Divider from '../../divider'
// constants
import mockup from '../constants/mockup-spec'
// @twreporter
import entityPaths from '@twreporter/core/lib/constants/entity-path'
import mq from '@twreporter/core/lib/utils/media-query'
import Link from '@twreporter/react-components/lib/customized-link'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
const _ = {
  forEach,
  get,
  map,
}

const DesktopOnly = styled.div`
  display: none;
  ${mq.desktopAndAbove`
    display: flex;
  `}
`
const MobileOnly = styled.div`
  display: none;
  ${mq.tabletAndBelow`
    display: flex;
  `}
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: inherit;
    text-decoration: none;
  }
`
const Item = styled.div`
  margin-bottom: 24px;
  &:hover {
    opacity: 0.7;
  }
  &:last-child {
    margin-bottom: 0;
  }
  width: 100%;
  ${mq.mobileOnly`
    width: ${(mockup.mobile.cardWidth / mockup.mobile.maxWidth) * 100}%;
  `}
`
const StyledDivider = styled(Divider)`
  margin-top: 24px;
`
const FlexItem = styled.div`
  width: ${mockup.hd.maxWidth}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  ${mq.desktopOnly`
    width: ${mockup.desktop.maxWidth}px;
  `}

  ${mq.tabletOnly`
    width: ${mockup.tablet.maxWidth}px;
  `}

  ${mq.mobileOnly`
    width: 100%;
    justify-content: center;
  `}
`
const Content = FetchingWrapper(FlexItem)

const CardList = ({
  data = [],
  isFetching = false,
  showSpinner = false,
  releaseBranch = BRANCH.master,
}) => {
  if (!data || data.length === 0) {
    return null
  }

  const getFirstCategory = categorySets => {
    let res = ''
    _.forEach(categorySets, ({ category, subcategory }) => {
      if (category && category.name) {
        res = category.name
        return false
      }
    })

    return res
  }

  const listJSX = _.map(data, item => {
    const { id, title, slug, style } = item
    const link = {
      to:
        style === 'interactive'
          ? entityPaths.interactiveArticle + slug
          : entityPaths.article + slug,
      target: style === 'interactive' ? '_blank' : '',
    }
    const articleCardProps = {
      title,
      description: _.get(item, 'og_description', ''),
      image: {
        alt: _.get(item, 'hero_image.description', ''),
        src:
          _.get(item, 'hero_image.resized_targets.mobile.url') ||
          _.get(item, 'og_image.resized_targets.mobile.url'),
      },
      category: getFirstCategory(_.get(item, 'category_set', [])),
      date: date2yyyymmdd(_.get(item, 'published_date'), '/'),
      releaseBranch,
    }

    return (
      <Item key={id}>
        <Link {...link}>
          <DesktopOnly>
            <ArticleCard {...articleCardProps} size="L" />
          </DesktopOnly>
          <MobileOnly>
            <ArticleCard {...articleCardProps} size="S" />
          </MobileOnly>
          <StyledDivider />
        </Link>
      </Item>
    )
  })

  return (
    <Container>
      <Content isFetching={isFetching} showSpinner={showSpinner}>
        {listJSX}
      </Content>
    </Container>
  )
}
CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      og_description: PropTypes.string.isRequired,
      hero_image: PropTypes.object,
      og_image: PropTypes.object,
      category_set: PropTypes.array,
      published_date: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      style: PropTypes.string,
    })
  ),
  isFetching: PropTypes.bool,
  showSpinner: PropTypes.bool,
  releaseBranch: BRANCH_PROP_TYPES,
}

export default CardList
