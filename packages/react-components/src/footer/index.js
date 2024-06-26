import React from 'react'
import styled from 'styled-components'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import fundraisingId from '@twreporter/core/lib/constants/fundraising'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import origins from '@twreporter/core/lib/constants/request-origins'

import { PillButton, InheritLinkButton } from '../button'
import divider from '../divider'
import { P2, P3 } from '../text/paragraph'
import { TabletAndBelow } from '../rwd'
import Link from '../customized-link'
// components
import { FooterLinkButtonGroups, FooterSocialMediaIcons } from './link'
import Logo from './logo'

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${colorGrayscale.white};
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  ${mq.desktopAndAbove`
    max-width: 1200px;
    padding: 48px;
  `}
  ${mq.tabletAndBelow`
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    padding: 48px 24px 96px;
  `}
`

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${mq.tabletAndBelow`
    flex-direction: column;
    justify-content: center;
  `}
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    text-decoration: none;
  }
  ${mq.desktopAndAbove`
    max-width: 320px;
  `}
  ${mq.tabletAndBelow`
    gap: 32px;
    width: 100%;
    margin-bottom: 48px;
    align-items: center;
    text-align: center;
  `}
  .button {
    width: 280px;
    justify-content: center;
  }
`

const LogoAndDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  ${mq.tabletAndBelow`
    align-items: center;
    gap: 16px;
  `}
`

const LinksContainer = styled.div`
  display: flex;
  gap: 24px;
  ${mq.tabletAndBelow`
    margin-bottom: 16px;
    gap: 16px;
  `}
`

const Divider = styled(divider)`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mq.tabletAndBelow`
    flex-direction: column-reverse;
    gap: 24px;
    align-items: center;
    text-align: center;
  `}
`

const InfoContainer = styled.div`
  display: flex;
  ${mq.tabletAndBelow`
    flex-direction: column;
    align-items: center;
  `}
`

const DescWithLink = styled(P3)`
  color: ${colorGrayscale.gray600};
`

const InfoLinkItem = styled(InheritLinkButton)`
  &,
  &:visited {
    color: inherit !important;
  }
`

const IconList = styled.div`
  display: flex;
  gap: 16px;
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const P3Gray600 = styled(P3)`
  color: ${colorGrayscale.gray600};
`

const DesktopAndAboveWithFlex = styled.div`
  display: flex;
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const InfoLink = ({ releaseBranch = releaseBranchConsts.release }) => {
  const mainOrigin = origins.forClientSideRendering[releaseBranch].main
  return (
    <DescWithLink>
      <InfoLinkItem
        text="許可協議"
        link={{
          isExternal: true,
          to: `${mainOrigin}/a/license-footer`,
          target: '_blank',
        }}
        type={InheritLinkButton.Type.UNDERLINE}
      />
      ｜
      <InfoLinkItem
        text="隱私政策"
        link={{
          isExternal: true,
          to: `${mainOrigin}/a/privacy-footer`,
          target: '_blank',
        }}
        type={InheritLinkButton.Type.UNDERLINE}
      />
      ｜
      <InfoLinkItem
        text="品牌規範"
        link={{
          isExternal: true,
          to: 'https://twreporter.gitbook.io/the-reporter-brand-guidelines',
          target: '_blank',
        }}
        type={InheritLinkButton.Type.UNDERLINE}
      />
    </DescWithLink>
  )
}

InfoLink.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

const Footer = ({ releaseBranch = releaseBranchConsts.release }) => {
  return (
    <FooterContainer>
      <FooterSection>
        <UpperContainer>
          <InformationContainer>
            <LogoAndDescription>
              <Logo releaseBranch={releaseBranch} />
              <P2Gray600 text="台灣第一個由公益基金會成立的網路媒體，致力於公共領域調查報導，打造多元進步的媒體環境。" />
            </LogoAndDescription>
            <Link
              to={origins.forClientSideRendering[releaseBranch].support}
              target="_blank"
            >
              <PillButton
                className="button"
                type={PillButton.Type.SECONDARY}
                size={PillButton.Size.L}
                text={'贊助我們'}
              />
            </Link>
          </InformationContainer>
          <LinksContainer>
            <FooterLinkButtonGroups releaseBranch={releaseBranch} />
          </LinksContainer>
        </UpperContainer>
        <Divider />
        <BottomContainer>
          <InfoContainer>
            <P3Gray600 text={fundraisingId} />
            <DesktopAndAboveWithFlex>
              <P3Gray600 text="｜" />
              <InfoLink releaseBranch={releaseBranch} />
              <P3Gray600 text="｜" />
            </DesktopAndAboveWithFlex>
            <TabletAndBelow>
              <InfoLink releaseBranch={releaseBranch} />
            </TabletAndBelow>
            <P3Gray600
              text={`Copyright © ${new Date().getFullYear()} The Reporter.`}
            />
          </InfoContainer>
          <IconList>
            <FooterSocialMediaIcons releaseBranch={releaseBranch} />
          </IconList>
        </BottomContainer>
      </FooterSection>
    </FooterContainer>
  )
}

Footer.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export default Footer
