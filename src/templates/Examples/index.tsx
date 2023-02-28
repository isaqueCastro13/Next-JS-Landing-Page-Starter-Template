import { useEffect, useState, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { endOfDay } from 'date-fns';
import Head from 'next/head';
import { MdTimelapse } from 'react-icons/md';
import TextLoop from 'react-text-loop';
import { useTimer } from 'react-timer-hook';
import { toast } from 'react-toastify';
import { zinc } from 'tailwindcss/colors';

import logosImg from '../../assets/logos.jpg';
import BackImg from '../../background/back.webp';

function MyTimer({ expiryTimestamp }: any) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
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

const LiComponent = ({ step, title, steps, last }: any) => {
  const [status, setStatus] = useState('current');

  useEffect(() => {
    let newStatus = 'idle';
    if (steps === step) {
      newStatus = 'current';
    } else if (steps > step) {
      newStatus = 'passed';
    } else {
      newStatus = 'idle';
    }

    setStatus(newStatus);
  }, [steps, step]);

  return (
    <li
      className={
        // eslint-disable-next-line no-nested-ternary
        last
          ? status === 'current'
            ? 'flex items-center text-orange-500 dark:text-orange-500'
            : 'flex items-center'
          : `flex md:w-full items-center ${
              status === 'current' ? 'text-orange-500 dark:text-orange-500' : ''
            }  sm:after:content-[''] after:w-full after:h-1 after:border-b  after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 after:border-zinc-700`
      }
    >
      <span
        className={`flex items-center ${
          !last ? "after:content-['/']" : ''
        } sm:after:hidden after:mx-2 after:font-light after:text-zinc-500`}
      >
        {status === 'passed' && (
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-2 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}

        {status === 'idle' && <span className="mr-2">{step + 1}</span>}

        {status === 'current' && (
          <span className="mr-2 text-orange-500 dark:text-orange-500">
            {step + 1}
          </span>
        )}

        {title}
      </span>
    </li>
  );
};

const Examples = () => {
  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const [time, setTime] = useState<any>(null);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState('simbolo');
  const [persona, setPersona] = useState('moderna');
  const [colors, setColors] = useState<string[]>(['preto', 'branco']);
  const [isVisible, setIsVisible] = useState(false);

  function changeStep(step: number) {
    setLoading(true);

    const errors = [];

    if (step === 1) {
      if (!name) {
        errors.push(1);
      }
      if (!bio) {
        errors.push(1);
      }
      if (!area) {
        errors.push(1);
      }
    }

    if (step === 2) {
      if (!type) {
        errors.push(1);
      }
      if (!persona) {
        errors.push(1);
      }
    }
    if (step === 3) {
      if (!colors) {
        errors.push(1);
      }
    }

    if (errors.length > 0) {
      toast.error('Preencha e/ou selecione todos os campos', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (step === 3) {
        window.location.href = `/resultado?name=${name}&area=${area}&bio=${bio}&type=${type}&persona=${persona}&colors=${colors.toString()}`;
      } else {
        setLoading(false);
        setSteps(step);
      }
    }, 1000);
  }

  useEffect(() => {
    const newD = new Date();

    const result = endOfDay(newD);
    setTime(result);
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="wrapper w-full sm:h-full flex flex-col-reverse md:flex-row justify-between items-center">
      <Head>
        <title>
          Confira uma prévia da sua logo criada por IA gratuitamente | Publikup
        </title>
      </Head>
      <div
        style={{
          backgroundImage: `url(${BackImg.src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: zinc['900'],
        }}
        className="h-full pt-32 pb-40 sm:pb-20  md:w-2/3 xl:w-1/2  p-6 bg-zinc-900 sm:p-20 flex flex-col justify-start items-center"
      >
        <div className="hero mb-8 ">
          <small className="text-lg sm:text-base font-light block mr-auto ml-auto text-left text-zinc-300">
            Crie a{' '}
            <span className="text-white font-bold">logo da sua marca</span> com
            a tecnologia da IA
          </small>
          <h1 className="text-white leading-none mt-8 w-full max-w-[1000px] font-bold text-4xl text-left">
            {steps === 0 && (
              <>
                Confira uma prévia da sua{' '}
                <span className="text-orange-400">logo</span> criada por IA{' '}
                <span className="text-orange-400">gratuitamente.</span>
              </>
            )}
            {steps === 1 && (
              <>
                Defina alguns <span className="text-orange-400">estilos</span>{' '}
                para sua logo.
              </>
            )}
            {steps === 2 && (
              <>
                Defina as{' '}
                <span className="text-orange-400">cores que você gostaria</span>{' '}
                que tivessem na logo.
              </>
            )}
          </h1>
        </div>

        <ol className="flex items-center w-full max-w-[600px] text-xl font-medium text-center text-zinc-500 dark:text-zinc-400 sm:text-base">
          <LiComponent step={0} title="Descrição" steps={steps} />
          <LiComponent step={1} title="Estilo" steps={steps} />
          <LiComponent step={2} title="Cores" steps={steps} last />
        </ol>

        <Form
          ref={formRef}
          onSubmit={() => {}}
          className="flex w-full flex-col items-center gap-y-4 justify-center pt-8"
        >
          {steps === 0 && (
            <>
              <div className="top w-full  sm:mb-2 flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:gap-x-4">
                <div className="w-full sm:w-1/2">
                  <label className="block mb-2  text-lg sm:text-base font-medium text-white dark:text-white">
                    Área de atuação
                  </label>
                  <div>
                    <div
                      className={`${
                        !area ? 'text-zinc-400' : 'text-white dark:text-white'
                      }  border h-[49px] sm:h-auto   text-lg sm:text-base rounded-lg  block w-full p-2.5 bg-zinc-800 dark:bg-zinc-800 border-zinc-600 placeholder-zinc-400  focus:ring-orange-500 focus:border-orange-500`}
                    >
                      <select
                        id="type"
                        onChange={(e) => setArea(e.target.value)}
                        value={area}
                        className="w-full h-full outline-none bg-transparent border-none"
                        name="area"
                      >
                        <option
                          className="bg-zinc-800 text-white"
                          value=""
                          selected
                        >
                          Escolha uma opcão
                        </option>
                        <option
                          className="bg-zinc-800 text-white"
                          value="advocacia"
                        >
                          Advocacia
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="agricultura"
                        >
                          Agricultura
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="alimentos"
                        >
                          Alimentos
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="arquitetura"
                        >
                          Arquitetura
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="automotivo"
                        >
                          Automotivo
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="beleza"
                        >
                          Beleza
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="construção"
                        >
                          Construção
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="consultoria"
                        >
                          Consultoria
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="design"
                        >
                          Design
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="educação"
                        >
                          Educação
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="eletrônicos"
                        >
                          Eletrônicos
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="energia"
                        >
                          Energia
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="eventos"
                        >
                          Eventos
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="financeiro"
                        >
                          Financeiro
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="fitness"
                        >
                          Fitness
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="fotografia"
                        >
                          Fotografia
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="imóveis"
                        >
                          Imóveis
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="indústria"
                        >
                          Indústria
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="jardinagem"
                        >
                          Jardinagem
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="jurídico"
                        >
                          Jurídico
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="marketing"
                        >
                          Marketing
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="mídia"
                        >
                          Mídia
                        </option>
                        <option className="text-white bg-zinc-800" value="moda">
                          Moda
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="saúde"
                        >
                          Saúde
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="seguros"
                        >
                          Seguros
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="serviços"
                        >
                          Serviços
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="tecnologia"
                        >
                          Tecnologia
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="transporte"
                        >
                          Transporte
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="turismo"
                        >
                          Turismo
                        </option>
                        <option
                          className="text-white bg-zinc-800"
                          value="varejo"
                        >
                          Varejo
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="brand_name"
                    className="block mb-2  text-lg sm:text-base font-medium text-white"
                  >
                    Qual o nome da marca?
                  </label>
                  <input
                    type="text"
                    id="brand_name"
                    name="brand_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" border   text-lg sm:text-base rounded-lg  block w-full p-2.5 bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-white focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Ex.: IH Advocacia"
                    required
                  />
                </div>
              </div>

              <div className="w-full ">
                <label
                  htmlFor="company_description"
                  className="block mb-2  text-lg sm:text-base font-medium text-white"
                >
                  Qual serviço sua empresa vende ou presta?
                </label>
                <input
                  type="text"
                  id="company_description"
                  name="company_description"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className=" border   text-lg sm:text-base rounded-lg  block w-full p-2.5 bg-zinc-800 border-zinc-600 placeholder-zinc-400 text-white focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Ex.: Somos uma loja de venda de ternos"
                  required
                />
              </div>
            </>
          )}

          {steps === 1 && (
            <div className="flex mb-2 flex-col items-center gap-x-6 gap-y-4 justify-center-pt-8">
              <div>
                <h3 className="text-lg text-center mb-2 font-medium text-white">
                  Tipo da marca:
                </h3>
                <ul className="block w-full text-center">
                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="symbol"
                      checked={type === 'simbolo'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setType('simbolo');
                        }
                      }}
                      name="select-type"
                      value="simbolo"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="symbol"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Símbolo</span>
                      </div>
                    </label>
                  </li>
                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="abstract"
                      checked={type === 'abstrato'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setType('abstrato');
                        }
                      }}
                      name="select-type"
                      value="abstrato"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="abstract"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Abstrato</span>
                      </div>
                    </label>
                  </li>
                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="shield"
                      name="select-type"
                      checked={type === 'brasao'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setType('brasao');
                        }
                      }}
                      value="brasao"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="shield"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Brasão</span>
                      </div>
                    </label>
                  </li>

                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="animal"
                      name="select-type"
                      checked={type === 'mascote'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setType('mascote');
                        }
                      }}
                      value="mascote"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="animal"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Mascote</span>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>

              <div className="w-full">
                <h3 className="text-lg text-center mb-2 font-medium  text-white">
                  Personalidade:
                </h3>
                <ul className="block w-full text-center">
                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="modern"
                      checked={persona === 'moderna'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPersona('moderna');
                        }
                      }}
                      name="select-persona"
                      value="moderna"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="modern"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Moderna</span>
                      </div>
                    </label>
                  </li>
                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="luxury"
                      checked={persona === 'luxo'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPersona('luxo');
                        }
                      }}
                      name="select-persona"
                      value="luxo"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="luxury"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Luxo</span>
                      </div>
                    </label>
                  </li>
                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="funny"
                      checked={persona === 'divertida'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPersona('divertida');
                        }
                      }}
                      name="select-persona"
                      value="divertida"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="funny"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Divertida</span>
                      </div>
                    </label>
                  </li>

                  <li className="inline-block mb-2 mx-1 select-none">
                    <input
                      type="radio"
                      id="different"
                      name="select-persona"
                      value="ousada"
                      checked={persona === 'ousada'}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPersona('ousada');
                        }
                      }}
                      className="hidden peer"
                    />
                    <label
                      htmlFor="different"
                      className="inline-flex p-x-2 h-10 items-center justify-center  border-transparent border-2  cursor-pointer hover:text-zinc-300 peer-checked:bg-orange-600 hover:text-zinc-600 p-2 peer-checked:text-zinc-300 peer-checked:text-zinc-600 rounded-sm hover:bg-zinc-50 text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
                    >
                      <div>
                        <span className="font-bold text-white">Ousada</span>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {steps === 2 && (
            <div className="flex px-8 flex-col items-center gap-y-4 justify-center-pt-8">
              <h3 className="text-lg text-center font-medium text-white">
                Escolha as cores:{' '}
              </h3>
              <span className="text-zinc-400 text-center -mt-2">
                (cores iniciais para a prévia, pode deixar sem nenhuma que será
                preto e branco :))
              </span>
              <ul className="block w-full text-center gap-6">
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="orange"
                    name="select-color"
                    value="laranja"
                    checked={colors.indexOf('laranja') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="orange"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-orange-500  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-orange-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="blue"
                    name="select-color"
                    value="azul"
                    checked={colors.indexOf('azul') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="blue"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-blue-600  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-blue-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="red"
                    name="select-color"
                    checked={colors.indexOf('vermelho') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    value="vermelho"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="red"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-red-600  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-red-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="yellow"
                    name="select-color"
                    value="amarelo"
                    checked={colors.indexOf('amarelo') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="yellow"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-yellow-600  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-yellow-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="green"
                    name="select-color"
                    checked={colors.indexOf('verde') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    value="verde"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="green"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-green-600  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-green-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="purple"
                    name="select-color"
                    value="roxo"
                    checked={colors.indexOf('roxo') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="purple"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-purple-500  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-purple-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
                <li className="inline-block mb-2 mx-1 select-none">
                  <input
                    type="checkbox"
                    id="teal"
                    checked={colors.indexOf('teal') !== -1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setColors((old) => [...old, e.target.value]);
                      } else {
                        setColors((old) => {
                          let od = [...old];
                          od = od.filter((i) => i !== e.target.value);
                          return od;
                        });
                      }
                    }}
                    name="select-color"
                    value="teal"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="teal"
                    className="inline-flex w-10 h-10 peer-checked:scale-110 items-center justify-center border-transparent border-2  cursor-pointer dark:hover:text-zinc-300 peer-checked:border-teal-600  p-2 peer-checked:text-zinc-300 rounded-sm text-zinc-400 bg-zinc-800"
                  >
                    <div className="w-full h-full rounded-sm p-[2px] bg-zinc-50 border-3 border-transparent">
                      <div className="bg-teal-500 rounded-sm w-full h-full border-2 border-zinc-800"></div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          )}
          <div className="flex mt-8 flex-col items-center">
            <button
              type="button"
              disabled={loading}
              onClick={() => changeStep(steps + 1)}
              className="text-white  bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm p-4 text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-500 dark:focus:ring-zinc-700"
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              <span className="sr-only">Avançar</span>
            </button>

            {steps > 0 && (
              <span
                onClick={() => setSteps((old) => (old === 0 ? 0 : old - 1))}
                className="text-base text-center mt-4 underline items-center justify-center font-medium text-zinc-400 cursor-pointer"
              >
                Voltar
              </span>
            )}
          </div>
        </Form>
      </div>

      <div
        style={{
          background: `url(${logosImg.src}) no-repeat`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundColor: zinc['900'],
        }}
        className="w-full h-0 md:block md:w-1/3 xl:w-1/2 md:h-full bg-zinc-900 flex justify-end items-end"
      >
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
      </div>

      <div
        className={`status ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }  fixed w-full px-6 transition-opacity sm:opacity-100 sm:absolute sm:px-0 sm:w-auto top-6 sm:top-auto sm:bottom-8 sm:right-1/2 sm:translate-x-1/2`}
      >
        <h1 className="text-zinc-400  opacity-100 shadow-sm shadow-zinc-900 sm:shadow-zinc-600 sm:shadow-sm sm:opacity-75 bg-zinc-800 sm:bg-transparent p-4  rounded-lg  text-center font-semibold text-base">
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
    </div>
  );
};

export default Examples;
