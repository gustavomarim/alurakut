import React, { useSteate } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser
  const [comunidades, setComunidades] = React.useState([])
  const [isShowingMoreCommunities, setIsShowingMoreCommunities] = React.useState(false);
  const [following, setFollowing] = React.useState([]);
  const [isShowingMoreFollowing, setIsShowingMoreFollowing] = React.useState(false);
  const [followers, setFollowers] = React.useState([]);
  const [isShowingMoreFollowers, setIsShowingMoreFollowers] = React.useState(false);

  function handleCriarComunidade(e) {
    e.preventDefault()
    const dadosDoForm = new FormData(e.target)
    const comunidade = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
      creatorSlug: githubUser,
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
      .then(async (response) => {
        const dados = await response.json();
        console.log(dados.registroCriado);
        const comunidade = dados.registroCriado;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas)
      })
  }

  React.useState(['Alurakut']); // Hooks

  // API GraphQL
  React.useEffect(function () {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '2412cb84c44f2e4678faa234cab261',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
            allCommunities {
              id 
              title
              imageUrl
              creatorSlug
            }
          }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })
  }, []);

  React.useEffect(function getGithubFollowers() {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setFollowers(respostaCompleta)
        console.log(respostaCompleta);
      })
  }, []);

  React.useEffect(function getGithubFollowing() {
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setFollowing(respostaCompleta);
      })
  }, []);

  function handleShowMoreFollowing(e) {
    e.preventDefault();
    setIsShowingMoreFollowing(!isShowingMoreFollowing);
  };

  function handleShowMoreFollowers(e) {
    e.preventDefault();
    setIsShowingMoreFollowers(!isShowingMoreFollowers);
  };

  function handleShowMoreCommunities(e) {
    e.preventDefault();
    setIsShowingMoreCommunities(!isShowingMoreCommunities);
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box as="aside">
            <h1 className="title">

              {/* Fazer um fetch para a api do github (Chamar a propriedade nome de lá) */}
              Bem vindo(a) {githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => handleCriarComunidade(e)} >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text-" />
              </div>

              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa" />
              </div>

              <div>
                <input
                  placeholder="Insira um link para sua comunidade"
                  name="image"
                  aria-label="Insira um link para sua comunidade" />
              </div>

              <button>
                Criar comunidade
              </button>

               {/* <button>
                Escrever depoimento
              </button>

              <button>
                Deixar um scrap
              </button> */}
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBoxWrapper
            isShowingMoreItems={isShowingMoreFollowers}>
            <h2 className="smallTitle">Seguidores ({followers.length})</h2>
            <ul>
              {followers.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/profile/${item.login}`} >
                      <a>
                        <img src={`https://github.com/${item.login}.png`} />
                        <span>{item.login}</span>
                      </a>
                    </a>
                  </li>
                );
              })}
            </ul>
            {followers.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreFollowers(e)}
                >
                  {isShowingMoreFollowers ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>       

          <ProfileRelationsBoxWrapper
            isShowingMoreItems={isShowingMoreFollowing}>
            <h2 className="smallTitle">Seguindo ({following.length})</h2>
            <ul>
              {following.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/profile/${item.login}`} >
                      <a>
                        <img src={`https://github.com/${item.login}.png`} />
                        <span>{item.login}</span>
                      </a>
                    </a>
                  </li>
                );
              })}
            </ul>
            {following.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreFollowing(e)}
                >
                  {isShowingMoreFollowing ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMoreCommunities}>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunities/${itemAtual.id}`} key={itemAtual.title}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {comunidades.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreCommunities(e)}
                >
                  {isShowingMoreCommunities ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
};
