import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
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

// function ProfileRelationsBox(propriedades) {
//   return (
//     <ProfileRelationsBoxWrapper >
//       <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})</h2>
//       <ul>
//         {/* {seguidores.map((itemAtual) => {
//           return (
//             <li key={itemAtual}>
//               <a href={`https://github.com/${itemAtual}.png`}>
//                 <img src={itemAtual.image} />
//                 <span>{itemAtual.title}</span>
//               </a>
//             </li>
//           )
//         })} */}
//       </ul>
//     </ProfileRelationsBoxWrapper>
//   )
// }

export default function Home() {
  const githubUser = 'gustavomarim';

  function handleCriarComunidade(e) {
    e.preventDefault()
    const dadosDoForm = new FormData(e.target)

    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image'),
      link: dadosDoForm.get('link'),
    }

    const comunidadesAtualizadas = [...comunidades, comunidade]
    setComunidades(comunidadesAtualizadas)
  }

  const [isShowingMoreCommunities, setIsShowingMoreCommunities] = React.useState(false);

  React.useState(['Alurakut']); // Hooks
  const [comunidades, setComunidades] = React.useState([
    {
      id: '121231321391381',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
      id: 2,
      title: 'Não fui eu, foi meu Eu lírico',
      image:
        'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'Eu amo minha mãe',
      image:
        'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Alura',
      image:
        'https://yt3.ggpht.com/ytc/AKedOLRszi3O39AB5-uw_1jkrxJppwegjToBgIKFIOqiiA=s88-c-k-c0x00ffffff-no-rj',
      link: 'https://www.alura.com.br/',
    },
    {
      id: 5,
      title: 'Rocketseat',
      image:
        'https://yt3.ggpht.com/ytc/AKedOLQkXnYChXAHOeBQLzwhk1_BHYgUXs6ITQOakoeNoQ=s88-c-k-c0x00ffffff-no-rj',
      link: 'https://rocketseat.com.br/',
    },
  ])

  // Alterar para fetch
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  //  0 - Pegar o array de dados do github
  // React.useEffect(function () {
  //   fetch(`https://api.github.com/users/${githubUser}/followers`)
  //   .then(function (respostaDoServidor) {
  //     return respostaDoServidor.json()
  //   })
  //   .then(function (respostaCompleta) {
  //     setSeguidores(respostaCompleta)
  //   })
  // }, [])

  const [seguidores, setSeguidores] = React.useState([])
  const [followers, setFollowers] = React.useState([]);
  const [isShowingMoreFollowers, setIsShowingMoreFollowers] = React.useState(false);

  React.useEffect(function getGithubFollowers() {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json()
      })
      .then(function (respostaCompleta) {
        setFollowers(respostaCompleta)
      })
  }, [])

  // useEffect(() => {
  //   getGithubFollowers();
  // }, []);


  function handleShowMoreFollowers(e) {
    e.preventDefault();
    setIsShowingMoreFollowers(!isShowingMoreFollowers);
  }

  function handleShowMoreCommunities(e) {
    e.preventDefault();
    setIsShowingMoreCommunities(!isShowingMoreCommunities);
  }

  //  1 - Criar um box que vai ter um map, baseado nos itens do array que pegamos no Github

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

              {/*  <button>
                Escrever depoimento
              </button>

              <button>
                Deixar um scrap
              </button> */}
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {pessoasFavoritas.length > 6 && (
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

          <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMoreCommunities}>
            <h2 className="subtitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
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

          <ProfileRelationsBoxWrapper
            isShowingMoreItems={isShowingMoreFollowers}
          >
            <h2 className="smallTitle">Seguidores ({followers.length})</h2>
            <ul>
              {followers.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/profile/${item.login}`} passHref>
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

        </div>
      </MainGrid>
    </>
  )
}