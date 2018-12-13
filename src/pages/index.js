import React from 'react'
import Script from 'react-load-script'
import styled from 'styled-components'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { H1 } from '../components/Typography.Headings'
import { Hero, HeroTitle, HeroSubTitle } from '../components/Common.Hero'
import { FeatureContainer, Feature } from '../components/Vitess.Features'
import { Footer } from '../components/Layout.Footer'
import { VitessSection } from '../components/Home.VitessSection'
import { ContactSalesCard } from '../components/Home.ContactSalesCard'

import background from '../images/hero/home-bg.svg'
import overlay from '../images/hero/home-overlay.svg'

function handleScriptLoad() {
  if (typeof window !== `undefined` && window.netlifyIdentity) {
    window.netlifyIdentity.on('init', (user) => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/'
        })
      }
    })
  }
  window.netlifyIdentity.init()
}

const VitessDescription = styled.p`
  margin: 0 auto;
  max-width: 550px;
  font-size: 20px;
`

export default function IndexPage({ data, location }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <React.Fragment>
      <Script
        url="https://identity.netlify.com/v1/netlify-identity-widget.js"
        onLoad={() => handleScriptLoad()}
      />
      <TitleAndMetaTags title="Home" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#EFAD2D'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>{pageData.subtitle}</HeroTitle>
          <HeroSubTitle>{pageData.content}</HeroSubTitle>
        </Wrapper>
      </Hero>

      <VitessSection
        title={pageData.vitessIntroduction.title}
        logo={pageData.vitessIntroduction.logo}
        content={pageData.vitessIntroduction.content}
        overlay={overlay}
      />

      <Wrapper>
        <H1>{pageData.vitess.title}</H1>
        <VitessDescription>{pageData.vitess.description}</VitessDescription>
        <FeatureContainer>{pageData.vitess.list.map(Feature)}</FeatureContainer>
      </Wrapper>

      <ContactSalesCard
        title={pageData.offerings.title}
        icon={pageData.offerings.icon}
        content={pageData.offerings.content}
      />
      <Footer
        backgroundImage={background}
        backgroundColor={'#EFAD2D'}
        overlay={overlay}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query homeQuery {
    allPagesYaml(filter: { id: { regex: "/pages/index/" } }) {
      edges {
        node {
          title
          subtitle
          content
          vitessIntroduction {
            title
            logo
            content
          }
          vitess {
            title
            description
            list {
              icon
              title
              content
            }
          }
          offerings {
            title
            icon
            content
          }
        }
      }
    }
  }
`
