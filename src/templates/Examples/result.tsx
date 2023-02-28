import { useState, useEffect } from 'react';

import 'react-phone-input-2/lib/style.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { endOfDay } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaWhatsapp } from 'react-icons/fa';
import { MdTimelapse } from 'react-icons/md';
import { Carousel } from 'react-responsive-carousel';
import TextLoop from 'react-text-loop';
import { useTimer } from 'react-timer-hook';
import { zinc } from 'tailwindcss/colors';

import BackImg from '../../background/back.png';
import * as fbq from '../../libs/fpixel';

function MyTimer({ expiryTimestamp }: any) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {},
  });

  return (
    <div className="text-right">
      <div className="text-base mt-2 mr-2 text-right text-orange-300 font-semibold">
        <span className="text-orange-400 text-xl font-bold">{days}</span>d{' '}
        <span className="text-orange-400 text-xl font-bold">{hours}</span>h{' '}
        <span className="text-orange-400 text-xl font-bold">{minutes}</span>m{' '}
        <span className="text-orange-400 text-xl font-bold">{seconds}</span>s{' '}
      </div>
    </div>
  );
}

const Results = () => {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState<any>(null);

  const [formActive, setFormActive] = useState(false);

  const [loading, setLoading] = useState(false);

  const [comments] = useState([
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1079101567183114361/dsadsadsa_create_a_minimal_simple_logo_to_a_pub_and_restaurant__2b358b24-ae6a-4e42-b823-e1f1d0b021b6.png?width=658&height=658',
      content:
        'Eu não poderia estar mais feliz com o meu novo logo. A equipe foi muito prestativa e atenciosa durante todo o processo e me ofereceu várias opções incríveis para escolher.',
      author: 'Ana Silva',
    },
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1079080788865319053/dsadsadsa_create_a_logo_for_a_pizza_company_called_pizza_wood_f_9769d4f7-e805-4d2a-8599-9036ae02326b.png?width=658&height=658',
      content:
        'Estou impressionado com a rapidez e eficiência do serviço de criação de logos com IA. Eu precisava de uma logo para a minha nova empresa em um prazo muito curto, e eles entregaram um trabalho incrível em poucas horas.',
      author: 'João Rodrigues',
    },
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1079101022900867204/dsadsadsa_create_a_logo_to_a_pub_company_drinks_hard_bright_pal_5cdd044c-d416-4b83-ab50-c65780daa4fd.png?width=658&height=658',
      content:
        'Eu tinha uma ideia bem específica em mente para o meu logo, mas não sabia como executá-la. A equipe do serviço de criação de logos com IA trabalhou comigo para transformar a minha visão em realidade, e o resultado final ficou além das minhas expectativas.',
      author: 'Maria Souza',
    },
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1079818287300493362/isahfc_create_a_minimal_vector_logo_to_a_lawyers_company_called_44010419-314a-494e-8a2d-3cc3f0bce8c4.png?width=658&height=658',
      content:
        'Eu não acreditava que seria possível ter uma logo profissional por um preço tão acessível, mas a publikup me provou o contrário. A qualidade do trabalho é excelente e o custo-benefício é incomparável. ',
      author: 'André Santos',
    },
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1079072137517731970/dsadsadsa_create_a_minimal_simple_vector_logo_to_a_woman_compan_d449b56e-8984-4be0-b152-1c6942605374.png?width=658&height=658',
      content:
        'Eu precisava de uma logo para a minha empresa em um prazo apertado e não tinha muita certeza sobre o que queria. O serviço foi incrível em me oferecer diversas opções de design e me ajudar a escolher a melhor delas.',
      author: 'Isabela Oliveira',
    },
    //  {
    //   image: '',
    //   content: 'Eu estava procurando uma empresa para criar a logo da minha nova marca e encontrei o serviço de criação de logos com IA e designers. Fiquei impressionado com a velocidade e eficiência do processo, e o resultado final superou minhas expectativas. O preço foi justo e a entrega foi rápida e fácil. Recomendo muito!',
    //   author: ' João Silva'
    //  },
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1078801693673791508/dsadsadsa_create_a_logo_for_a_pizza_company_called_pizza_wood_f_f4ab9d60-9c0c-4341-ad71-afcbc5dadc79.png?width=658&height=658',
      content:
        'Eles me deram várias opções de logo para escolher e me ajudaram a encontrar a opção perfeita para a minha marca. A combinação de IA e designers tornou o processo muito rápido e eficiente, e eu amei o resultado final. Recomendo a todos!',
      author: 'Maria Santos',
    },
    {
      image:
        'https://media.discordapp.net/attachments/1077764093471113243/1079818286914601051/carrinho-vetor.png?width=658&height=658',
      content:
        'Eu não tinha certeza de como queria minha logo, mas a equipe de criação me ajudou a encontrar a direção certa. Eles me deram várias opções e trabalharam comigo para ajustar a que eu mais gostei. O preço foi muito justo pelo trabalho de qualidade que recebi. Recomendo muito o serviço da publikup',
      author: 'Pedro Oliveira',
    },
  ]);
  const router = useRouter();
  const [pageKey, setPageKey] = useState(Date.now());
  const { name, bio, area, type, persona, colors } = router.query;

  const eventEmit = (event: string, content?: any) => {
    fbq.event(event, content);
  };

  const customEventEmit = (event: string, content?: any) => {
    fbq.customEvent(event, content);
  };

  function activeForm() {
    setLoading(true);
    setFormActive(true);

    setTimeout(() => {
      setLoading(false);
      customEventEmit('ViewResultPage', {
        brandName: name,
        bio,
        area,
      });
    }, 1000);
  }

  useEffect(() => {
    // atualiza a chave da página sempre que a rota muda
    setPageKey(Date.now());
  }, [router.asPath]);

  function goToWhatsApp() {
    eventEmit('Contact');
    setTimeout(() => {
      window.open(
        `https://wa.me/5582981377969?text=${encodeURI(
          `Oii vim conferir as prévias da minha logo \n\nNome: *${name}* \nArea: *${area}* \nDescrição: *${bio}*\nTipo de logo: *${type}*\nPersonalidade da marca: *${persona}*\nCores:*${colors}*`
        )}`,
        '_blank'
      );
    }, 200);
  }

  useEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    function startLoading() {
      setProgress(0);

      const intervalId = setInterval(() => {
        setProgress((prevProgress): any => {
          const newProgress = prevProgress + 1;

          if (newProgress >= 100) {
            clearInterval(intervalId);
            activeForm();
          }

          return newProgress;
        });
      }, 150);
    }
    startLoading();

    const newD = new Date();

    const result = endOfDay(newD);
    // newD.setSeconds(newD.getSeconds() + 1800);
    setTime(result);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${BackImg.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: zinc['900'],
        minHeight: '100%',
      }}
      key={pageKey}
      className="w-full flex gap-6 sm:gap-20 items-center justify-center flex-col-reverse sm:flex-row "
    >
      <Head>
        <title>Resultados | Publikup</title>
      </Head>
      {formActive ? (
        <>
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-32 h-32 mr-2 mb-4 animate-spin text-zinc-700 fill-orange-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <div className="limited-time-banner flex flex-col items-end absolute top-6 right-0 mx-6 sm:right-6 ">
                <div className="opacity-95 rounded-full py-1 items-center pr-4 flex bg-orange-200 w-full sm:py-0 sm:h-8 sm:w-fit">
                  <div className="h-8 w-8 min-w-fit ml-2 min-h-fit flex items-center text-xl justify-center text-zinc-800 sm:ml-0 sm:bg-orange-500 mr-2 rounded-full">
                    <MdTimelapse />
                  </div>
                  <span className="text-zinc-800 text-sm sm:text-base">
                    As prévias gratuitas estão disponíveis por{' '}
                    <strong>tempo limitado</strong>
                  </span>
                </div>
                {time && <MyTimer expiryTimestamp={time} />}
              </div>
              <div className="top -mt-10 w-full flex flex-col px-6 items-center max-w-[400px]  mb-2 gap-x-4 sm:px-0">
                <h2 className="text-3xl max-[320px]:text-xl text-white leading-none text-center font-bold">
                  Suas <span className="text-orange-500">prévias</span> estão{' '}
                  <span className="text-orange-500">a caminho</span>
                </h2>
                <p className="text-zinc-300 max-[320px]:text-base mt-8 leading-normal font-medium text-lg text-center">
                  Estamos tendo muitos acessos e{' '}
                  <span className="font-bold text-orange-500">
                    suas prévias serão enviadas pelo whatsapp, tudo bem?
                  </span>{' '}
                  😊
                </p>
                <small className="text-zinc-400 mt-3 leading-normal text-sm text-center">
                  <span className="font-semibold">clique no botão</span> para
                  nos{' '}
                  <span className="font-semibold">
                    mandar uma mensagem e enviarmos suas prévias
                  </span>
                </small>

                <div className="w-full mt-6">
                  {/* <label
                htmlFor="bio"
                className="block mb-2 text-base font-medium text-zinc-900 dark:text-white"
              >
                Celular:
              </label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="(__) _____-____"
                value={number}
                className=" border  text-base rounded-lg  block w-full p-2.5 bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-white focus:ring-orange-500 focus:border-orange-500"
                onChange={(e: any) => setNumber(e.target.value)}
              ></InputMask>
              <p className="text-zinc-300 text-center my-3">ou</p> */}
                  <button
                    type="button"
                    onClick={() => goToWhatsApp()}
                    className="focus:outline-none flex items-center justify-center font-bold w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-base px-5 py-3  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <FaWhatsapp className="mr-2 text-base" /> Ir para o WhatsApp
                  </button>
                  {/* <PhoneInput
                country={'us'}
                value={number}
                inputClass="bg-zinc-700"
                containerClass="bg-zinc-700"
                searchClass="bg-zinc-700"
                dropdownClass="bg-zinc-700"
                onChange={(phone) => setNumber(phone)}
              /> */}
                  {/* <input
                type="text"
                id="bio"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className=" border  text-base rounded-lg  block w-full p-2.5 bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-white focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ex.: Somos uma loja de venda de ternos"
                required
              /> */}
                </div>
              </div>
              <div className="status absolute bottom-8 sm:right-1/2 sm:translate-x-1/2 mx-2 w-full px-6 sm:w-fit sm:mx-0 sm:px-0">
                <h1 className="text-zinc-400 opacity-75 bg-zinc-800 py-4  rounded-lg w-full  text-center font-semibold text-sm sm:p-4 sm:text-base sm:w-fit">
                  <TextLoop
                    interval={4500}
                    className="overflow-hidden font-bold text-zinc-300 text-center "
                  >
                    {/* <span>First item</span>
                    <Link to="/">Second item</Link>
                    <BodyText>Third item</BodyText> */}
                    <span>João</span>
                    <span>Maria</span>
                    <span>Pedro</span>
                    <span>Ana</span>
                    <span>Lucas</span>
                    <span>Júlia</span>
                    <span>Carlos</span>
                    <span>Sofia</span>
                    <span>Rafael</span>
                    <span>Letícia</span>
                    <span>Felipe</span>
                    <span>Mariana</span>
                    <span>Marcelo</span>
                    <span>Camila</span>
                    <span>Thiago</span>
                    <span>Isabela</span>
                    <span>Arthur</span>
                    <span>Bianca</span>
                    <span>Gustavo</span>
                    <span>Lara</span>
                    <span>Henrique</span>
                    <span>Larissa</span>
                    <span>Vinícius</span>
                    <span>Beatriz</span>
                    <span>André</span>
                    <span>Jéssica</span>
                    <span>Leonardo</span>
                    <span>Alice</span>
                    <span>Gabriel</span>
                    <span>Melissa</span>
                  </TextLoop>{' '}
                  gerou versões da sua nova logo
                </h1>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay
            swipeable={false}
            centerMode={false}
            infiniteLoop
            interval={6000}
            className="w-full sm:w-[300px] px-6 sm:px-0"
          >
            {comments.map((comm, index) => (
              <div key={index} className="flex flex-col items-start">
                <div
                  style={{
                    backgroundImage: `url(${comm.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] bg-zinc-400 "
                ></div>
                {/* <span className="text-5xl">"</span> */}
                <p className="text-sm  text-left w-full sm:w-[300px] mt-8 font-semibold text-zinc-400">
                  &quot;{comm.content}&quot;
                </p>
                <span className="text-sm text-left  mt-4 font-bold text-zinc-300">
                  - {comm.author}
                </span>
              </div>
            ))}
          </Carousel>

          <div className="flex flex-col items-start p-6 sm:p-0">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-16 h-16 sm:w-32 sm:h-32 mr-2 mb-4  animate-spin text-zinc-700 fill-orange-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <h1 className="text-3xl mt-3 leading-none sm:text-4xl text-white  font-semibold">
              Estamos{' '}
              <strong className="text-orange-500">gerando sua logo</strong>
            </h1>
            <p className="text-base font-medium mt-3 text-zinc-400">
              Aguarde alguns instantes...
            </p>
            <div className="w-full mt-8 rounded-full bg-zinc-700">
              <div
                className="bg-orange-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%`, transition: 'width .5s' }}
              >
                {' '}
                {progress}%
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
