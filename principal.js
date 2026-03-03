import React, { useState } from 'react';
import { 
  BookOpen, Users, Leaf, Cpu, MessageSquare, BarChart, Image as ImageIcon, Mail, 
  CheckCircle, Award, ArrowRight, RefreshCcw, MapPin, Heart, Globe, Music, Video, 
  Activity, Shield, Search, PenTool, Lock, Home, Star, Zap, Lightbulb, ThumbsUp, 
  Menu, X, Briefcase, GraduationCap, Library, Layers, TerminalSquare, Settings, LockKeyhole
} from 'lucide-react';

// --- HELPERS & GENERATORS ---

// Función para ordenar aleatoriamente (Shuffle) un arreglo
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Generador de 4 Opciones Estándar (Aleatorizadas)
const genOpts = (tradText, actText, badAIText, optText) => {
  const options = [
    { id: 'trad', text: tradText, feedback: `Estrategia Tradicional: Fomenta la memorización mecánica y el aprendizaje pasivo, alejándose del enfoque constructivista de la NEM.`, score: { humanismo: 0, innovacion: 0 }, isCorrect: false },
    { id: 'act', text: actText, feedback: `Estrategia Actualizada: Utiliza herramientas TIC instrumentalmente, pero no logra problematizar el entorno comunitario ni desarrollar pensamiento crítico profundo.`, score: { humanismo: 5, innovacion: 10 }, isCorrect: false },
    { id: 'badAI', text: badAIText, feedback: `Estrategia IA Superficial (Inadecuada): Delega el proceso cognitivo a la máquina. El estudiante asume un rol pasivo, limitando su desarrollo analítico y su agencia formativa.`, score: { humanismo: 0, innovacion: 15 }, isCorrect: false },
    { id: 'opt', text: optText, feedback: `Estrategia Óptima con IA: Integra la tecnología como andamiaje cognitivo, conecta el aprendizaje con problemas comunitarios (PAEC) y empodera al estudiante.`, score: { humanismo: 20, innovacion: 20 }, isCorrect: true }
  ];
  return shuffleArray(options);
};

// Generador de Escenarios de Secundaria (2 Niveles)
const createSecundariaScenarios = (prefix, discipline, level1Data, level2Data) => {
  const scenarios = [];
  
  level1Data.forEach((t, idx) => {
    scenarios.push({
      id: `${prefix}_1_${idx + 1}`, levelGroup: 'Nivel 1: Fundamentos Básicos', discipline, title: t.title, context: t.context, problem: t.problem,
      options: genOpts(t.trad, t.act, t.badAI, t.opt)
    });
  });

  level2Data.forEach((t, idx) => {
    scenarios.push({
      id: `${prefix}_2_${idx + 1}`, levelGroup: 'Nivel 2: Profundización Multimedia', discipline, title: t.title, context: t.context, problem: t.problem,
      options: genOpts(t.trad, t.act, t.badAI, t.opt)
    });
  });

  return scenarios;
};

// --- 1. DATOS DE SECUNDARIA (80 ESCENARIOS ORIGINALES RECUPERADOS Y EXPANDIDOS A 4 OPCIONES) ---

const secLenguajesL1 = [
  { title: 'La Crónica Local', context: 'Dificultad para estructurar ideas.', problem: '¿Cómo apoyar la redacción sin hacer la tarea?', trad: 'Explicar la estructura en el pizarrón y encargar redacción libre.', act: 'Usar un procesador de texto con plantillas predefinidas.', badAI: 'Pedir a Gemini que escriba toda la crónica basándose en tres palabras clave.', opt: 'Usar IA como andamiaje para generar lluvia de ideas y un esquema.' },
  { title: 'Intercambio Virtual', context: 'Miedo a cometer errores en inglés.', problem: '¿Cómo dar confianza?', trad: 'Pasar al frente a leer diálogos del libro.', act: 'Usar una app de juegos de vocabulario como tarea.', badAI: 'Escribir en español y pedir a la IA que traduzca todo al inglés.', opt: 'Realizar un Roleplay privado conversando con un tutor de IA para fluidez.' },
  { title: 'Muralismo Digital', context: 'Ideas abstractas sin boceto.', problem: '¿Cómo visualizar conceptos?', trad: 'Copiar murales de los libros de historia.', act: 'Buscar imágenes genéricas en internet e imprimirlas.', badAI: 'Pedir a la IA que genere la imagen final y calcarla sin imprimirle identidad.', opt: 'Generar múltiples imágenes con IA como moodboard de inspiración.' },
  { title: 'Guion Teatral', context: 'Traba en diálogos sobre acoso.', problem: '¿Apoyo en dramaturgia?', trad: 'Memorizar libretos clásicos de teatro.', act: 'Escribir el guion en un documento de texto en blanco.', badAI: 'Pedir a la IA que redacte la obra teatral completa y memorizarla.', opt: 'Ingresar anécdotas de los alumnos y usar IA para darles formato de guion.' },
  { title: 'Debate de Redes', context: 'Falta de argumentos sólidos.', problem: '¿Investigación crítica?', trad: 'Buscar en enciclopedias físicas.', act: 'Copiar el primer resultado de Google.', badAI: 'Que la IA escriba todo el discurso y el alumno lo lea.', opt: 'Pedir a la IA argumentos con fuentes opuestas para analizarlos.' },
  { title: 'Listening Especializado', context: 'Audios del libro muy rápidos.', problem: '¿Personalizar el audio?', trad: 'Usar solo el CD del libro repitiendo 10 veces.', act: 'Buscar un video de YouTube genérico.', badAI: 'Pedir a IA que lea la traducción en español.', opt: 'Generar un cuento corto en IA nivel A1 y usar Text-to-Speech.' },
  { title: 'Composición de Rap', context: 'Deseo de componer sobre derechos.', problem: '¿Apoyo en métrica y rima?', trad: 'Cantar canciones folclóricas.', act: 'Buscar diccionarios de rimas online.', badAI: 'Pedir a la IA que componga y cante toda la canción.', opt: 'Pedir a la IA listas de palabras que rimen para que armen los versos.' },
  { title: 'Coreografía Geométrica', context: 'Vincular matemáticas y danza.', problem: '¿Cómo inspirar movimiento?', trad: 'Bailes regionales tradicionales.', act: 'Copiar bailes virales de TikTok.', badAI: 'IA genera un video 3D de un avatar y los alumnos lo imitan.', opt: 'IA describe secuencias de danza contemporánea basadas en figuras geométricas.' },
  { title: 'Análisis Poético', context: 'Poemas de Sor Juana incomprensibles.', problem: '¿Mejorar comprensión lectora?', trad: 'Examen de métrica y rima asonante.', act: 'Leer el análisis ya hecho en Wikipedia.', badAI: 'IA resume el poema en una línea para evitar leerlo.', opt: 'Pedir a IA que "traduzca" el poema al lenguaje juvenil para comparar.' },
  { title: 'Señalética Bilingüe', context: 'Lengua originaria y español.', problem: '¿Preservación cultural?', trad: 'Usar diccionarios físicos viejos.', act: 'Usar Google Translate directamente.', badAI: 'IA traduce toda la señalética y se imprime sin revisar.', opt: 'IA investiga palabras básicas y un abuelo de la comunidad las valida.' }
];
const secLenguajesL2 = [
  { title: 'Podcast Literario', context: 'Análisis de libros aburridos.', problem: '¿Cómo fomentar análisis atractivo?', trad: 'Hacer un reporte de lectura escrito a mano.', act: 'Grabar un audio leyendo el reporte tradicional.', badAI: 'IA genera el guion completo y clona las voces para no grabar nada.', opt: 'IA convierte el resumen en un guion de entrevista al autor o de misterio.' },
  { title: 'Tour Turístico', context: 'Promover turismo local en inglés.', problem: '¿Producción oral?', trad: 'Memorizar vocabulario de un folleto.', act: 'Grabar un video leyendo un texto en inglés.', badAI: 'IA genera un avatar de video que presenta el pueblo en inglés.', opt: 'Grabar sitios locales y usar IA para corregir la pronunciación.' },
  { title: 'Paisaje Sonoro', context: 'El sonido de la comunidad.', problem: '¿Apreciación sonora?', trad: 'Solo escuchar música clásica en el aula.', act: 'Bajar efectos de sonido aleatorios de internet.', badAI: 'IA compone una sinfonía urbana de 0 sin input local.', opt: 'Grabar sonidos del mercado y mezclarlos digitalmente.' },
  { title: 'Cómic Social', context: 'Dibujar contra la discriminación.', problem: '¿Narrativa gráfica?', trad: 'Copiar superhéroes famosos comerciales.', act: 'Hacer dibujos en Paint.', badAI: 'IA genera las páginas del cómic terminadas para imprimir.', opt: 'Pedir a IA descripciones de personajes diversos para inspirar sus dibujos.' },
  { title: 'Detectives Fake News', context: 'Alumnos comparten noticias falsas.', problem: '¿Alfabetización mediática?', trad: 'Prohibir celulares en clase.', act: 'Dar plática con diapositivas sobre ciberseguridad.', badAI: 'Usar una extensión que bloquea noticias automáticamente.', opt: 'Usar Gemini para verificar noticias y crear un "Manual de Verdad".' },
  { title: 'App Vocabulario Indígena', context: 'Palabras en peligro de olvido.', problem: '¿Tecnología lingüística?', trad: 'Anotar palabras en el pizarrón.', act: 'Hacer una tabla en Excel simple.', badAI: 'IA inventa traducciones sin contexto cultural.', opt: 'Base de datos en Sheets con audios de abuelos para una mini-app.' },
  { title: 'Videodanza', context: 'Danza para redes sociales.', problem: '¿Expresión corporal digital?', trad: 'Bailar sin sentido musical.', act: 'Hacer un challenge de baile de moda.', badAI: 'IA anima personajes 3D bailando y se entrega como proyecto.', opt: 'Coreografías con narrativa editadas en video con mensaje social.' },
  { title: 'Tutorial de Cocina', context: 'Recetas familiares en inglés.', problem: '¿Instrucciones y procesos?', trad: 'Escribir la receta del libro de texto.', act: 'Traducir una receta genérica de un blog.', badAI: 'IA genera el video tutorial con imágenes sintéticas de comida.', opt: 'Grabar a la abuela cocinando y añadir subtítulos en inglés revisados con IA.' },
  { title: 'Radioteatro', context: 'Contar leyendas locales.', problem: '¿Expresión oral emotiva?', trad: 'Leer en voz baja en sus lugares.', act: 'Enviar audios de WhatsApp leyendo.', badAI: 'IA genera todos los diálogos y efectos de sonido sola.', opt: 'Usar IA para generar efectos sonoros que ambienten sus propias voces.' },
  { title: 'Revista Escolar', context: 'Difusión de proyectos finales.', problem: '¿Edición y publicación?', trad: 'Pegar hojas blancas en el periódico mural.', act: 'Hacer un PDF en formato aburrido.', badAI: 'IA redacta y maqueta la revista entera automáticamente.', opt: 'Colaborar en Docs y usar IA para pulir el estilo de la revista interactiva.' }
];

const secSaberesL1 = [
  { title: 'Estadística Basura', context: 'Datos de basura en recreo.', problem: '¿Análisis de datos ágil?', trad: 'Contar palitos a mano en el cuaderno.', act: 'Hacer una gráfica de pastel básica en Excel.', badAI: 'IA redacta las conclusiones descriptivas para que solo las copien.', opt: 'IA en hojas de cálculo identifica patrones para interpretar impacto ambiental.' },
  { title: 'Ecosistemas Locales', context: 'Plantas desconocidas en el parque.', problem: '¿Identificación natural?', trad: 'Arrancar hojas para llevar al salón.', act: 'Buscar parecidos visuales en Google Imágenes.', badAI: 'IA identifica la foto y el alumno anota el nombre sin investigar más.', opt: 'IA de visión (Lens) identifica y luego investigan su rol en el ecosistema.' },
  { title: 'Simulación Velocidad', context: 'Aceleración es abstracta.', problem: '¿Cómo acercar el concepto físico?', trad: 'Dictar fórmula a = F/m con 50 ejercicios.', act: 'Mostrar animación 2D genérica de un coche.', badAI: 'IA resuelve los problemas matemáticos paso a paso por ellos.', opt: 'Pedir a Gemini analogías de fútbol para adolescentes sobre aceleración.' },
  { title: 'Reacciones Peligrosas', context: 'No hay laboratorio.', problem: '¿Experimentación segura?', trad: 'Anotar fórmulas químicas balanceadas en pizarrón.', act: 'Ver videos en YouTube de explosiones.', badAI: 'Preguntar a IA qué pasa y copiar el texto.', opt: 'IA describe visual y químicamente la reacción paso a paso para que dibujen.' },
  { title: 'Geometría Urbana', context: 'Mejorar el patio escolar.', problem: '¿Aplicación de área/perímetro?', trad: 'Ejercicios de patios imaginarios en libros.', act: 'Hacer un croquis en papel cuadriculado.', badAI: 'IA genera un plano arquitectónico terminado.', opt: 'Medir en Google Earth y pedir a IA sugerencias de distribución espacial.' },
  { title: 'Genética', context: 'Leyes de Mendel complejas.', problem: '¿Gamificación de biología?', trad: 'Leer el capítulo del libro en voz alta.', act: 'Juego de memoria digital con términos.', badAI: 'IA resuelve los cuadros de Punnett de la tarea.', opt: 'IA genera un caso de "Paternidad de dragones" con genotipos a resolver.' },
  { title: 'Energía Renovable', context: 'Feria de ciencias solar.', problem: '¿Investigación técnica?', trad: 'Comprar kit solar ya hecho.', act: 'Copiar proyecto de otra escuela de internet.', badAI: 'IA elabora todo el reporte técnico de justificación.', opt: 'IA compara eficiencia teórica de materiales caseros para calentar agua.' },
  { title: 'Nutrición Química', context: 'Comida chatarra y elementos.', problem: '¿Vida saludable y química?', trad: 'Memorizar los símbolos periódicos.', act: 'Jugar memorama de elementos químicos.', badAI: 'IA genera una dieta estricta genérica.', opt: 'Lens en etiquetas chatarra y Gemini explica los efectos de los aditivos.' },
  { title: 'Presupuesto Familiar', context: 'Taller financiero.', problem: '¿Hoja de cálculo aplicada?', trad: 'Hacer sumas y restas en libreta.', act: 'Usar calculadora del celular.', badAI: 'IA crea un presupuesto inventado para entregar.', opt: 'Plantilla en Sheets donde IA sugiere categorías y fórmulas de ahorro.' },
  { title: 'Divulgación Científica', context: 'Cierre de bloque.', problem: '¿Comunicación?', trad: 'Examen escrito estandarizado.', act: 'Hacer diapositivas con mucho texto.', badAI: 'IA hace los ensayos finales sin que ellos escriban.', opt: 'IA transforma sus informes en guiones para podcast de "Ciencia para Todos".' }
];
const secSaberesL2 = [
  { title: 'Modelado 3D', context: 'Geometría espacial compleja.', problem: '¿Visualización matemática?', trad: 'Ver dibujos planos en 2D del libro.', act: 'Usar software para dibujar cubos básicos.', badAI: 'IA modela toda la figura para imprimir en 3D directo.', opt: 'Herramientas dinámicas e IA para visualizar cortes antes de construir con cartón.' },
  { title: 'Huerto Inteligente', context: 'Riego escolar ineficiente.', problem: '¿Tecnología agrícola?', trad: 'Regar cuando se acuerden con cubetas.', act: 'Poner una alarma en el celular para regar.', badAI: 'IA controla el sistema de riego sin que entiendan la lógica.', opt: 'Diseñar en hoja de cálculo el riego por goteo según tipo de planta y clima.' },
  { title: 'Cohetes de Agua', context: 'Aerodinámica y acción-reacción.', problem: '¿Experimentación física?', trad: 'Lanzar botellas al azar.', act: 'Ver videos de la NASA.', badAI: 'IA calcula el ángulo perfecto y ellos solo ejecutan.', opt: 'App de simulación balística para predecir trayectoria antes del lanzamiento.' },
  { title: 'Cosmética Natural', context: 'Jabones con plantas locales.', problem: '¿Química orgánica?', trad: 'Mezclar químicos sin saber.', act: 'Copiar una receta de Pinterest.', badAI: 'Comprar jabones hechos y decir que los hicieron.', opt: 'Investigar con IA propiedades químicas de plantas locales para recetas seguras.' },
  { title: 'Arte Fractal', context: 'Relación matemáticas-belleza.', problem: '¿Patrones infinitos?', trad: 'Hacer planas de números.', act: 'Ver galería de fotos de fractales.', badAI: 'IA dibuja un fractal que el alumno entrega como propio.', opt: 'Programar o usar software para generar fractales y analizar autosimilitud.' },
  { title: 'Composta Tech', context: 'Seguimiento de descomposición.', problem: '¿Procesos biológicos?', trad: 'Tirar basura y esperar meses.', act: 'Tomar fotos de vez en cuando.', badAI: 'IA genera los datos diarios inventados del proceso.', opt: 'Bitácora digital con fotos y temperatura para graficar velocidad de descomposición.' },
  { title: 'Acústica del Aula', context: 'Eco en el salón molesto.', problem: '¿Ondas sonoras aplicadas?', trad: 'Gritar más fuerte.', act: 'Poner cartones de huevo al azar.', badAI: 'IA calcula la ubicación exacta y lo instalan sin entender por qué.', opt: 'App sonómetro para medir decibeles y diseñar paneles con fundamentos físicos.' },
  { title: 'Reciclaje Plásticos', context: 'Tipos de polímeros.', problem: '¿Clasificación técnica?', trad: 'Quemar el plástico (peligroso).', act: 'Separar por colores solamente.', badAI: 'Una máquina IA los separa automáticamente.', opt: 'Usar visión artificial para leer códigos de resina y clasificarlos correctamente.' },
  { title: 'Criptografía Básica', context: 'Mensajes secretos.', problem: '¿Lógica y patrones?', trad: 'Pasar papelitos escondidos.', act: 'Jugar sopa de letras.', badAI: 'IA encripta y desencripta todo el texto sin mostrar el proceso.', opt: 'Crear su cifrado César en hojas de cálculo con fórmulas para decodificar.' },
  { title: 'Estación Meteorológica', context: 'Predecir lluvias locales.', problem: '¿Medición y clima?', trad: 'Adivinar viendo el cielo.', act: 'Ver la app del clima del celular.', badAI: 'IA genera un reporte falso basado en internet.', opt: 'Construir instrumentos, registrar en nube y comparar con pronósticos IA.' }
];

const secEticaL1 = [
  { title: 'Migración Local', context: 'Causas de migración estatal.', problem: '¿Análisis multifactorial?', trad: 'Leer libro de texto desactualizado.', act: 'Buscar noticias sueltas en internet.', badAI: 'Pedir a la IA un ensayo de 5 páginas sobre migración en el estado y entregarlo impreso.', opt: 'IA sintetiza datos económicos actuales para debatir causas locales.' },
  { title: 'Entrevista Histórica', context: 'Héroes patrios aburridos.', problem: '¿Empatía histórica?', trad: 'Línea de tiempo en cartulina.', act: 'Presentación de PPT con biografías.', badAI: 'IA resume la biografía de Miguel Hidalgo.', opt: 'Chat simulado en IA (Roleplay) con el personaje histórico.' },
  { title: 'Dilema de la Cartera', context: 'Cartera con dinero hallada.', problem: '¿Juicio ético?', trad: 'Decirles qué hacer moralmente.', act: 'Ver un video sobre la honestidad.', badAI: 'Preguntar a IA y hacer lo que dicte ciegamente.', opt: 'IA genera 3 desenlaces para que el grupo discuta consecuencias.' },
  { title: 'Clima 2050', context: 'Calentamiento global.', problem: '¿Prospectiva ambiental?', trad: 'Buscar fotos de osos polares.', act: 'Hacer una infografía genérica.', badAI: 'IA escribe propuesta y la leen sin aplicarla.', opt: 'IA proyecta clima local a 2050 para diseñar mitigación real.' },
  { title: 'Noticiero del Pasado', context: 'Revolución Mexicana.', problem: '¿Narrativa histórica?', trad: 'Resumir el libro.', act: 'Escuchar audiolibro pasivamente.', badAI: 'IA genera el noticiero en audio 100% sola.', opt: 'Guiones creados con IA actuados como "Última Hora" en clase.' },
  { title: 'Constitución Niños', context: 'Artículos legales complejos.', problem: '¿Accesibilidad legal?', trad: 'Leer texto jurídico original.', act: 'Ver video explicativo de leyes.', badAI: 'IA hace la tarea de civismo.', opt: 'IA reescribe el Art. 3ro en lenguaje sencillo para que lo analicen.' },
  { title: 'Turismo Sustentable', context: 'Promoción del pueblo.', problem: '¿Desarrollo económico?', trad: 'Copiar info de Wikipedia.', act: 'Hacer post en Facebook con fotos.', badAI: 'IA publica la campaña sola.', opt: 'Tríptico turístico asistido por IA resaltando conservación natural.' },
  { title: 'Mujeres en la Historia', context: 'Libros sesgados.', problem: '¿Perspectiva de género?', trad: 'Quedarse con el libro oficial.', act: 'Buscar "mujeres famosas" en Google.', badAI: 'IA hace una lista para copiarla al cuaderno.', opt: 'IA genera biografías de mujeres olvidadas para visibilizarlas.' },
  { title: 'Mediación Conflictos', context: 'Peleas en receso.', problem: '¿Cultura de paz?', trad: 'Suspender alumnos.', act: 'Plática de psicólogo general.', badAI: 'IA dicta los castigos automatizados.', opt: 'IA provee roles y guiones de preguntas para mediadores de paz.' },
  { title: 'Carta a la ONU', context: 'Propuestas de mundo mejor.', problem: '¿Ciudadanía global?', trad: 'Carta genérica guardada.', act: 'Enviar email a info@onu.org.', badAI: 'IA redacta la carta sin ideas de los alumnos.', opt: 'IA asiste la redacción formal bilingüe de sus propuestas.' }
];
const secEticaL2 = [
  { title: 'Mapeo de Riesgos', context: 'Zonas peligrosas en colonia.', problem: '¿Prevención desastres?', trad: 'Solo quejarse en clase.', act: 'Dibujar un croquis a mano.', badAI: 'IA mapea riesgos satelitales sin trabajo de campo.', opt: 'Mapa colaborativo digital (My Maps) marcando baches e inundaciones.' },
  { title: 'Museo Virtual', context: 'Objetos antiguos familiares.', problem: '¿Patrimonio?', trad: 'Tirar cosas viejas.', act: 'Hacer exposición en el salón.', badAI: 'IA inventa la historia de los objetos.', opt: 'Galería virtual con fotos y audios narrando microhistoria familiar.' },
  { title: 'Simulacro Electoral', context: 'Elegir jefe de grupo.', problem: '¿Democracia?', trad: 'Alzar la mano.', act: 'Votar en papelitos.', badAI: 'IA escoge al jefe basado en calificaciones.', opt: 'Formularios Google voto secreto y conteo en tiempo real.' },
  { title: 'Recursos Satelitales', context: 'Deforestación local.', problem: '¿Conciencia ambiental?', trad: 'Imaginar el bosque.', act: 'Ver fotos fijas antiguas.', badAI: 'IA escribe un ensayo de la deforestación.', opt: 'Timelapse de Google Earth mostrando cambios en 30 años.' },
  { title: 'Voces del Ayer', context: 'Entrevistas a abuelos.', problem: '¿Historia oral?', trad: 'No preguntar a mayores.', act: 'Grabar audio y no usarlo.', badAI: 'IA genera un falso testimonio de la época.', opt: 'IA transcribe entrevistas para analizar coincidencias históricas.' },
  { title: 'Campaña Bullying', context: 'Combatir acoso.', problem: '¿Inclusión?', trad: 'Ignorar el problema.', act: 'Hacer cartel en Word.', badAI: 'IA genera imágenes y eslogan que se publican solos.', opt: 'Carteles virales con mensajes positivos analizados éticamente.' },
  { title: 'Demografía Viva', context: 'Origen de las familias.', problem: '¿Población?', trad: 'Copiar datos INEGI.', act: 'Hacer gráfica de barras simple.', badAI: 'IA inventa los datos demográficos.', opt: 'Censo escolar digital para analizar la migración interna real.' },
  { title: 'Documental Escolar', context: 'Historia de la escuela.', problem: '¿Investigación?', trad: 'Leer la placa.', act: 'Hacer un video con fotos fijas y música.', badAI: 'IA genera un video falso con avatares.', opt: 'Escanear fotos viejas y narrar el documental grupalmente.' },
  { title: 'Reglamento Nuevo', context: 'Reglas injustas.', problem: '¿Legalidad?', trad: 'Imponer reglas directivas.', act: 'Votar sí/no.', badAI: 'IA escribe el reglamento estricto.', opt: 'Doc colaborativo editando propuestas democráticas de reglas.' },
  { title: 'IA y Sesgos', context: 'Racismo en algoritmos.', problem: '¿Ética tecnológica?', trad: 'Creer ciegamente en internet.', act: 'Evitar usar tecnología.', badAI: 'Descargar imágenes generadas sin analizar el contexto.', opt: 'Pedir a IA fotos de "personas exitosas" y debatir sesgos de raza/género.' }
];

const secHumanoL1 = [
  { title: 'Plan Entrenamiento', context: 'Capacidades físicas distintas.', problem: '¿Inclusión física?', trad: 'Todos corren 20 vueltas.', act: 'Usar app cuenta-pasos genérica.', badAI: 'IA hace rutina genérica que puede lastimar.', opt: 'IA adapta rutinas seguras para asma o sobrepeso.' },
  { title: 'Algoritmos Vida', context: 'Concepto de algoritmo.', problem: '¿Pensamiento computacional?', trad: 'Binario en pizarrón.', act: 'Ver video de robots.', badAI: 'IA programa todo sola.', opt: 'IA compara algoritmos con recetas de cocina de la abuela.' },
  { title: 'Diario Emociones', context: 'Estrés de exámenes.', problem: '¿Autocontrol?', trad: 'Ignorar estrés.', act: 'Escuchar música de meditación.', badAI: 'IA actúa como psicólogo irresponsable.', opt: 'IA da prompts de journaling reflexivo para desahogo.' },
  { title: 'Nutrición Recreo', context: 'Comida de cooperativa.', problem: '¿Vida saludable?', trad: 'Prohibir dulces.', act: 'Ver pirámide alimenticia.', badAI: 'IA genera dieta milagrosa.', opt: 'IA calcula exceso de azúcar y sugiere sustitutos baratos locales.' },
  { title: 'Seguridad Digital', context: 'Ciberacoso.', problem: '¿Ciudadanía digital?', trad: 'Quitar celulares.', act: 'Leer reglas de internet.', badAI: 'IA censura mensajes automáticamente.', opt: 'Quiz interactivo de IA sobre situaciones de riesgo online.' },
  { title: 'Vocacional', context: 'No saben qué estudiar.', problem: '¿Proyecto de vida?', trad: 'Estudiar por dinero.', act: 'Test genérico web.', badAI: 'IA decide la carrera por ellos.', opt: 'IA da lista de carreras futuras de impacto social.' },
  { title: 'Estrategia Equipo', context: 'Equipo escolar pierde.', problem: '¿Trabajo colaborativo?', trad: 'Gritar más fuerte.', act: 'Ver tácticas en YouTube.', badAI: 'IA simula el juego y da el ganador.', opt: 'Pizarra digital + IA sugiere jugadas según fortalezas de cada alumno.' },
  { title: 'Brecha Digital', context: 'Abuelos sin celular.', problem: '¿Servicio comunitario?', trad: 'Ignorarlos.', act: 'Imprimir manual de texto largo.', badAI: 'IA contesta mensajes por el abuelo.', opt: 'IA asiste crear manuales simplificados con letra grande para WhatsApp.' },
  { title: 'Mindfulness', context: 'Grupo inquieto.', problem: '¿Regulación?', trad: 'Regañarlos.', act: 'Poner ruido blanco.', badAI: 'IA da un mantra espiritual dogmático.', opt: 'IA genera guion de meditación de 3 minutos guiada por el docente.' },
  { title: 'Feria Proyectos', context: 'Presentación final a padres.', problem: '¿Vinculación?', trad: 'PPT mucho texto.', act: 'Post de Facebook.', badAI: 'IA presenta el proyecto virtualmente.', opt: 'IA organiza logística y redacta invitaciones personalizadas.' }
];
const secHumanoL2 = [
  { title: 'E-Sports Activo', context: 'Juegan en sillón.', problem: '¿Sedentarismo?', trad: 'Prohibir videojuegos.', act: 'Jugar Candy Crush en celular.', badAI: 'Simulación virtual de deporte sin moverse.', opt: 'Torneo E-Sports intercalado con retos físicos y just dance.' },
  { title: 'Diseño de App', context: 'Problema escolar.', problem: '¿Desarrollo software?', trad: 'Hablar de apps famosas.', act: 'Dibujar celular en cuaderno.', badAI: 'IA programa y compila la app final.', opt: 'Prototipar mockups digitales (UI/UX) del diseño.' },
  { title: 'Plan de Vida', context: 'Metas a largo plazo.', problem: '¿Autoconocimiento?', trad: 'Escribir lista y guardar.', act: 'Doc de Word simple.', badAI: 'IA predice su futuro como horóscopo.', opt: 'Vision Board digital interactivo proyectando sus metas.' },
  { title: 'Yoga Relajación', context: 'Ansiedad severa.', problem: '¿Salud mental?', trad: 'Decir que se calmen.', act: 'Ver videos de posturas.', badAI: 'IA diagnostica un trastorno de ansiedad.', opt: 'Apps y videos para guiar respiración antes de exámenes.' },
  { title: 'Cultura Maker', context: 'Reparar cosas rotas.', problem: '¿Impresión 3D?', trad: 'Tirar lo roto.', act: 'Ver fotos de impresoras 3D.', badAI: 'Pedir repuesto por Amazon.', opt: 'Diseñar piezas de repuesto en software 3D fomentando no desechar.' },
  { title: 'Soft Skills', context: 'No saben trabajar en equipo.', problem: '¿Colaboración?', trad: 'Conferencia de liderazgo.', act: 'Ver video motivacional.', badAI: 'IA califica la participación sola.', opt: 'Roleplay online simulando toma de decisiones críticas en equipo.' },
  { title: 'Hidratación', context: 'Alto consumo refresco.', problem: '¿Hábitos?', trad: 'Prohibir refresco.', act: 'Infografía de los riñones.', badAI: 'IA hace recordatorios molestos solos.', opt: 'App digital para registrar consumo de agua vs refresco (Gamificación).' },
  { title: 'Edición Video', context: 'Comunicar ideas.', problem: '¿Alfabetización digital?', trad: 'Exponer con cartulinas.', act: 'Hacer un Powerpoint.', badAI: 'IA hace todo el video con prompts de texto.', opt: 'Alumnos aprenden a grabar y editar cortometrajes en su celular.' },
  { title: 'Red de Apoyo', context: 'Se sienten solos.', problem: '¿Comunidad?', trad: 'Cada quien sus problemas.', act: 'Chat grupal caótico.', badAI: 'IA chatbot de compañía aislando al joven.', opt: 'Banco de tiempo digital para intercambiar habilidades entre pares.' },
  { title: 'Voluntariado', context: 'Ayudar fuera de escuela.', problem: '¿Servicio social?', trad: 'Quedarse encerrados.', act: 'Donar por transferencia web.', badAI: 'IA hace cartas de agradecimiento falsas.', opt: 'Campaña de alfabetización digital vecinal organizada por ellos.' }
];

// Generador Maestro para Educación Básica (Secundaria)
const SECUNDARIA_ROUTES = [
  { id: 'sec_len', title: 'Lenguajes', description: 'Español, Inglés y Artes (Fase 6)', icon: <MessageSquare className="w-8 h-8" />, color: 'bg-pink-100 text-pink-700 border-pink-300', buttonColor: 'bg-pink-600 hover:bg-pink-700', scenarios: createSecundariaScenarios('len', 'Lenguajes', secLenguajesL1, secLenguajesL2) },
  { id: 'sec_sab', title: 'Saberes Científicos', description: 'Matemáticas y Ciencias (Fase 6)', icon: <BarChart className="w-8 h-8" />, color: 'bg-blue-100 text-blue-700 border-blue-300', buttonColor: 'bg-blue-600 hover:bg-blue-700', scenarios: createSecundariaScenarios('sab', 'Saberes Científicos', secSaberesL1, secSaberesL2) },
  { id: 'sec_eti', title: 'Ética y Sociedades', description: 'Historia, Geografía y Cívica (Fase 6)', icon: <Globe className="w-8 h-8" />, color: 'bg-green-100 text-green-700 border-green-300', buttonColor: 'bg-green-600 hover:bg-green-700', scenarios: createSecundariaScenarios('eti', 'Ética y Sociedades', secEticaL1, secEticaL2) },
  { id: 'sec_hum', title: 'De lo Humano', description: 'Ed. Física, Tecnología y Socioemocional', icon: <Users className="w-8 h-8" />, color: 'bg-orange-100 text-orange-700 border-orange-300', buttonColor: 'bg-orange-600 hover:bg-orange-700', scenarios: createSecundariaScenarios('hum', 'De lo Humano y lo Comunitario', secHumanoL1, secHumanoL2) }
];

// --- 2. BACHILLERATO GENERAL Y TECNOLÓGICO (Progresión por Niveles 1-3) ---

// Pool de preguntas pedagógicas que NO mencionan explícitamente a la Inteligencia Artificial
const problemVariations = [
  "¿Qué estrategia didáctica es la más adecuada para lograr un aprendizaje situado según el MCCEMS?",
  "¿Qué enfoque pedagógico aporta mayor valor a la formación integral del estudiante en este contexto?",
  "¿Cuál de las siguientes acciones responde mejor al paradigma humanista-técnico de la Nueva Escuela Mexicana?",
  "¿Qué alternativa metodológica es óptima para desarrollar el pensamiento crítico frente a esta situación?",
  "¿Qué estrategia formativa promueve de manera más efectiva la agencia y transformación social comunitaria?"
];

// Generador Automático de Escenarios de Progresión (3 niveles x 5 = 15 escenarios)
const createProgressionScenarios = (prefix, discipline, topics) => {
  const scenarios = [];
  const levelNames = ['Nivel 1: Exploración y Fundamentos', 'Nivel 2: Integración y Contexto', 'Nivel 3: Agencia y Transformación Social'];

  topics.forEach((topic, idx) => {
    scenarios.push({
      id: `${prefix}_${idx + 1}`,
      levelGroup: levelNames[Math.floor(idx / 5)],
      discipline,
      title: topic.title || topic,
      context: topic.context || `Los estudiantes inician el abordaje del tema de "${topic}". El diagnóstico muestra apatía para encontrar la utilidad práctica de este concepto en su vida.`,
      problem: topic.problem || problemVariations[idx % problemVariations.length],
      options: genOpts(
        topic.trad || `Explicar los conceptos teóricos de "${topic}" en el pizarrón y aplicar cuestionario escrito.`,
        topic.act || `Proyectar un video interactivo o presentación sobre "${topic}" y hacer resumen digital.`,
        topic.badAI || `Pedir a la plataforma tecnológica que genere de forma automatizada un proyecto completo sobre "${topic}" para entregarlo.`,
        topic.opt || `Utilizar herramientas o simuladores digitales como andamiaje para que apliquen "${topic}" en un problema real de su colonia (PAEC).`
      )
    });
  });
  return scenarios;
};

// Data Bachillerato General
const bgTopicsMatematicas = ['Aritmética Básica', 'Lenguaje Algebraico', 'Ecuaciones Lineales', 'Geometría Plana', 'Trigonometría Aplicada', 'Estadística Descriptiva', 'Probabilidad Clásica', 'Funciones Cuadráticas', 'Modelación de Fenómenos', 'Geometría Analítica', 'Límites y Continuidad', 'Cálculo Diferencial', 'Optimización de Recursos', 'Cálculo Integral', 'Áreas y Acumulación'];
const bgTopicsFilosofia = ['El Mito y el Logos', 'Identidad Personal', 'Alteridad y Empatía', 'Valores Morales', 'Ética Comunitaria', 'Epistemología Básica', 'Desinformación y Verdad', 'Estética Contemporánea', 'Arte Digital', 'El Estado y la Ley', 'Filosofía Política', 'Contractualismo', 'Bioética Actual', 'Ética Tecnológica', 'Proyecto de Vida Pleno'];
const bgTopicsLengua = ['Síntesis de Información', 'Comprensión Lectora', 'Estructura Narrativa', 'Reseña Crítica', 'Debate Básico', 'Lógica Argumentativa', 'Detección de Falacias', 'El Ensayo Académico', 'Expresión Oral Escénica', 'Comunicación Asertiva', 'Lectura de Multimedios', 'Guionismo Educativo', 'Narrativa Transmedia', 'Campaña Escolar PAEC', 'Oratoria Comunitaria'];
const bgTopicsIngles = ['Presentaciones Básicas', 'Vocabulario Comunitario', 'Tiempos Simples', 'Listening Auténtico', 'Roleplay de Rutina', 'Expresión de Emociones', 'Tiempos Compuestos', 'Lectura de Noticias', 'Redacción de Correos', 'Diálogos Cruzados', 'Debates Globales', 'Proyectos PAEC Bilingües', 'Entendimiento de Slang', 'Simulacro de Entrevista', 'Ensayo Persuasivo'];
const bgTopicsCultura = ['Huella Digital', 'Privacidad y Datos', 'Prevención Ciberacoso', 'Ofimática en Nube', 'Búsqueda Avanzada', 'Trabajo Colaborativo', 'Algoritmos y Sesgos', 'Lógica Computacional', 'Bases de Datos Locales', 'Creación Multimedia', 'Análisis de Big Data', 'Auditoría a la Tecnología', 'Ciudadanía Crítica', 'Soluciones Tecnológicas', 'Impacto Global'];
const bgTopicsHistoria = ['Fuentes Históricas', 'El Sujeto Histórico', 'Microhistoria Local', 'Mitos Fundacionales', 'La Independencia', 'Movimientos Sociales', 'Las Leyes de Reforma', 'Revolución Mexicana', 'Perspectiva de Género', 'Instituciones del S.XX', 'Crisis Neoliberales', 'Globalización', 'Desigualdad Estructural', 'Memoria Oral Viva', 'Historia en el PAEC'];
const bgTopicsSociales = ['Origen del Estado', 'Instituciones Sociales', 'Derechos Humanos', 'Economía Familiar', 'Normas Comunitarias', 'Desigualdad Económica', 'Geografía Humana', 'Políticas Públicas', 'Democracia Escolar', 'Participación Activa', 'Problema Socioambiental', 'Modelos Económicos', 'Movimientos Civiles', 'El Sistema Jurídico', 'Cabildo Estudiantil'];
const bgTopicsCiencias = ['Método Científico', 'Flujo de Energía', 'Biología Celular', 'Sistemas Ecológicos', 'Reacciones Químicas', 'Genética y Herencia', 'Leyes del Movimiento', 'Estequiometría', 'Redes Tróficas', 'Biodiversidad Regional', 'Desarrollo Sustentable', 'Prototipos Verdes', 'Química Ambiental', 'Energías Limpias', 'Feria Científica PAEC'];
const bgTopicsLaboratorio = ['Definir el Problema', 'Pregunta de Indagación', 'Objetivos PAEC', 'Justificación Social', 'Plantear Hipótesis', 'Búsqueda de Literatura', 'Marco Teórico', 'Ética Académica', 'Diseño Metodológico', 'Crear Instrumentos', 'Trabajo de Campo', 'Análisis Cualitativo', 'Análisis Cuantitativo', 'Triangular Variables', 'Divulgación Social'];
const bgTopicsTaller = ['Observación de Entorno', 'Ideación STEM', 'Diseño Conceptual', 'Estudio de Materiales', 'Viabilidad de Proyecto', 'Cálculo de Eficiencia', 'Planos Digitales', 'Armado de Prototipos', 'Cultura Maker', 'Pruebas de Estrés', 'Depuración de Fallos', 'Registro Empírico', 'Iteración de Diseño', 'Medición de Impacto', 'Feria de Innovación'];

const BACH_GENERAL_ROUTES = [
  { id: 'bg_mat', title: 'Pensamiento Matemático', description: 'Currículum Fundamental: Álgebra, Geometría, Cálculo', icon: <BarChart className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-700 border-indigo-300', buttonColor: 'bg-indigo-600 hover:bg-indigo-700', scenarios: createProgressionScenarios('bg_mat', 'Pensamiento Matemático', bgTopicsMatematicas) },
  { id: 'bg_fil', title: 'Filosofía y Humanidades', description: 'Currículum Fundamental: Ética, Ontología, Lógica', icon: <Library className="w-8 h-8" />, color: 'bg-purple-100 text-purple-700 border-purple-300', buttonColor: 'bg-purple-600 hover:bg-purple-700', scenarios: createProgressionScenarios('bg_fil', 'Filosofía y Humanidades', bgTopicsFilosofia) },
  { id: 'bg_len', title: 'Lengua y Comunicación', description: 'Currículum Fundamental: Lectura, Ensayo, Debate', icon: <MessageSquare className="w-8 h-8" />, color: 'bg-rose-100 text-rose-700 border-rose-300', buttonColor: 'bg-rose-600 hover:bg-rose-700', scenarios: createProgressionScenarios('bg_len', 'Lengua y Comunicación', bgTopicsLengua) },
  { id: 'bg_ing', title: 'Inglés', description: 'Currículum Fundamental: Lengua Extranjera Integrada', icon: <Globe className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-700 border-cyan-300', buttonColor: 'bg-cyan-600 hover:bg-cyan-700', scenarios: createProgressionScenarios('bg_ing', 'Inglés', bgTopicsIngles) },
  { id: 'bg_cul', title: 'Cultura Digital', description: 'Currículum Fundamental: TIC, Datos y Ciudadanía', icon: <TerminalSquare className="w-8 h-8" />, color: 'bg-teal-100 text-teal-700 border-teal-300', buttonColor: 'bg-teal-600 hover:bg-teal-700', scenarios: createProgressionScenarios('bg_cul', 'Cultura Digital', bgTopicsCultura) },
  { id: 'bg_his', title: 'Conciencia Histórica', description: 'Currículum Fundamental: Memoria y Microhistoria', icon: <BookOpen className="w-8 h-8" />, color: 'bg-orange-100 text-orange-700 border-orange-300', buttonColor: 'bg-orange-600 hover:bg-orange-700', scenarios: createProgressionScenarios('bg_his', 'Conciencia Histórica', bgTopicsHistoria) },
  { id: 'bg_soc', title: 'Ciencias Sociales', description: 'Currículum Fundamental: Estado, Economía y Leyes', icon: <Users className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-700 border-emerald-300', buttonColor: 'bg-emerald-600 hover:bg-emerald-700', scenarios: createProgressionScenarios('bg_soc', 'Ciencias Sociales', bgTopicsSociales) },
  { id: 'bg_nat', title: 'Ciencias Naturales', description: 'Currículum Fundamental: Biología, Física y Química', icon: <Leaf className="w-8 h-8" />, color: 'bg-green-100 text-green-700 border-green-300', buttonColor: 'bg-green-600 hover:bg-green-700', scenarios: createProgressionScenarios('bg_nat', 'Ciencias Naturales', bgTopicsCiencias) },
  { id: 'bg_lab', title: 'Laboratorio de Investigación', description: 'Componente Extendido: Metodología y Proyecto Social', icon: <Search className="w-8 h-8" />, color: 'bg-violet-100 text-violet-700 border-violet-300', buttonColor: 'bg-violet-600 hover:bg-violet-700', scenarios: createProgressionScenarios('bg_lab', 'Laboratorio', bgTopicsLaboratorio) },
  { id: 'bg_tal', title: 'Taller de Ciencias', description: 'Componente Extendido: Cultura Maker y STEM', icon: <Zap className="w-8 h-8" />, color: 'bg-yellow-100 text-yellow-700 border-yellow-300', buttonColor: 'bg-yellow-600 hover:bg-yellow-700', scenarios: createProgressionScenarios('bg_tal', 'Taller de Ciencias', bgTopicsTaller) }
];

// Data Bachillerato Tecnológico
const btTopicsSoporte = ['Identificación de Herramientas', 'Seguridad Industrial', 'Lectura de Manuales', 'Mantenimiento Preventivo', 'Fundamentos Eléctricos', 'Diagnóstico de Fallas', 'Soporte Técnico', 'Optimización Insumos', 'Calidad Total', 'Normas ISO', 'Mantenimiento Predictivo', 'Automatización', 'Simulación de Procesos', 'Lógica de Controladores', 'Proyecto Integrador Técnico'];
const btTopicsInnovacion = ['Conceptos de Industria 4.0', 'Sensores e IoT', 'Recolección Datos Físicos', 'Redes Industriales', 'Ciberseguridad Operativa', 'Análisis de Vibraciones', 'Programación de PLCs', 'Robótica Básica', 'Gemelos Digitales', 'Impresión 3D Industrial', 'Big Data Aplicado', 'Mantenimiento Autónomo', 'Eficiencia Energética', 'Proyectos Ágiles', 'Desarrollo de Patentes'];
const btTopicsDual = ['Habilidades Blandas', 'Currículum Vitae', 'Comunicación Corporativa', 'Trabajo en Equipo', 'Liderazgo Técnico', 'Resolución de Conflictos', 'Ética Profesional', 'Simulacro Entrevistas', 'Adaptación al Cambio', 'Cultura Organizacional', 'Legislación Laboral', 'Emprendimiento', 'Educación Financiera', 'Pitch de Negocios', 'Egreso al Sector Productivo'];
const btTopicsProgramacion = ['Pensamiento Algorítmico', 'Diagramas y Pseudocódigo', 'Estructuras de Control', 'Programación Orientada a Objetos', 'Interfaces Gráficas', 'Estructuras de Datos', 'Bases de Datos Relacionales', 'Consultas SQL', 'Desarrollo Web Frontend', 'Desarrollo Web Backend', 'Consumo de APIs', 'Control de Versiones Git', 'Metodologías Ágiles', 'Pruebas y Depuración', 'Proyecto de Software Social'];
const btTopicsCiberseguridad = ['Conceptos de Redes y Protocolos', 'Criptografía Básica', 'Identificación de Malware', 'Vulnerabilidades Web', 'Ingeniería Social', 'Hardening de Sistemas', 'Seguridad Móvil', 'Firewalls y Filtrado', 'Análisis de Tráfico de Red', 'Pruebas de Penetración', 'Respuesta a Incidentes', 'Forense Digital', 'Hacking Ético', 'Normativas ISO 27001', 'Auditoría de Seguridad PAEC'];
const btTopicsIA = ['Fundamentos', 'Ética y Sesgos Tecnológicos', 'Lógica y Matemáticas', 'Programación en Python', 'Análisis Exploratorio', 'Machine Learning Básico', 'Modelos de Regresión', 'Árboles de Decisión', 'Redes Neuronales', 'Procesamiento de Lenguaje (NLP)', 'Visión por Computadora', 'Deep Learning Elemental', 'Entrenamiento de Modelos', 'Despliegue de Modelos', 'Solución Inteligente Comunitaria'];
const btTopicsRobotica = ['Fundamentos de Mecatrónica', 'Electrónica Básica', 'Microcontroladores (Arduino)', 'Sensores y Actuadores', 'Cinemática de Robots', 'Programación de Bloques a Código', 'Sistemas Neumáticos', 'Diseño e Impresión 3D (CAD)', 'Ensamblaje Robótico', 'Control PID', 'Controladores Lógicos (PLCs)', 'Robótica Industrial', 'Navegación Autónoma', 'Visión Artificial', 'Prototipo Asistencial'];

const BACH_TECNOLOGICO_ROUTES = [
  { id: 'bt_sop', title: 'Formación Tecnológica Básica', description: 'Módulos Profesionales: Mantenimiento y Soporte', icon: <Briefcase className="w-8 h-8" />, color: 'bg-blue-100 text-blue-700 border-blue-300', buttonColor: 'bg-blue-600 hover:bg-blue-700', scenarios: createProgressionScenarios('bt_sop', 'Soporte e Industria', btTopicsSoporte) },
  { id: 'bt_inn', title: 'Industria 4.0 y Desarrollo', description: 'Módulos Profesionales: IoT, Robótica y Datos', icon: <Cpu className="w-8 h-8" />, color: 'bg-teal-100 text-teal-700 border-teal-300', buttonColor: 'bg-teal-600 hover:bg-teal-700', scenarios: createProgressionScenarios('bt_inn', 'Innovación 4.0', btTopicsInnovacion) },
  { id: 'bt_prog', title: 'Programación', description: 'Módulos: Desarrollo Web, BD y POO', icon: <TerminalSquare className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-700 border-indigo-300', buttonColor: 'bg-indigo-600 hover:bg-indigo-700', scenarios: createProgressionScenarios('bt_prog', 'Programación', btTopicsProgramacion) },
  { id: 'bt_cib', title: 'Ciberseguridad', description: 'Módulos: Redes, Pentesting y Forense Digital', icon: <Shield className="w-8 h-8" />, color: 'bg-rose-100 text-rose-700 border-rose-300', buttonColor: 'bg-rose-600 hover:bg-rose-700', scenarios: createProgressionScenarios('bt_cib', 'Ciberseguridad', btTopicsCiberseguridad) },
  { id: 'bt_ia', title: 'Inteligencia Artificial Aplicada', description: 'Módulos: Machine Learning, Python y NLP', icon: <Cpu className="w-8 h-8" />, color: 'bg-violet-100 text-violet-700 border-violet-300', buttonColor: 'bg-violet-600 hover:bg-violet-700', scenarios: createProgressionScenarios('bt_ia', 'Desarrollo IA', btTopicsIA) },
  { id: 'bt_rob', title: 'Robótica y Automatización', description: 'Módulos: Mecatrónica, Arduino y PLC', icon: <Settings className="w-8 h-8" />, color: 'bg-orange-100 text-orange-700 border-orange-300', buttonColor: 'bg-orange-600 hover:bg-orange-700', scenarios: createProgressionScenarios('bt_rob', 'Robótica y Automatización', btTopicsRobotica) },
  { id: 'bt_dua', title: 'Educación Dual y Empleabilidad', description: 'Vinculación Empresarial y Soft Skills', icon: <Users className="w-8 h-8" />, color: 'bg-amber-100 text-amber-700 border-amber-300', buttonColor: 'bg-amber-600 hover:bg-amber-700', scenarios: createProgressionScenarios('bt_dua', 'Vinculación Laboral', btTopicsDual) }
];

// MASTER STRUCTURE
const EDUCATIONAL_LEVELS = {
  secundaria: {
    id: 'secundaria',
    title: 'Secundarias',
    shortTitle: 'Secundaria',
    description: 'Educación Básica - Fase 6 (Integración Disciplinar y Progresión)',
    icon: <BookOpen className="w-5 h-5" />,
    routes: SECUNDARIA_ROUTES
  },
  bachillerato_general: {
    id: 'bachillerato_general',
    title: 'Bachillerato General',
    shortTitle: 'Bach. General',
    description: 'MCCEMS 2025 - 10 Áreas Independientes (Progresión por Niveles)',
    icon: <GraduationCap className="w-5 h-5" />,
    routes: BACH_GENERAL_ROUTES
  },
  bachillerato_tecnologico: {
    id: 'bachillerato_tecnologico',
    title: 'Bachillerato Tecnológico',
    shortTitle: 'Bach. Tecnológico',
    description: 'Módulos Profesionales DGETI y Educación Dual',
    icon: <Briefcase className="w-5 h-5" />,
    routes: BACH_TECNOLOGICO_ROUTES
  }
};

// --- COMPONENTS ---

const App = () => {
  const [gameState, setGameState] = useState('welcome'); 
  const [currentLevelId, setCurrentLevelId] = useState('secundaria'); 
  const [currentRouteId, setCurrentRouteId] = useState(null);
  const [currentScenarioId, setCurrentScenarioId] = useState(null);
  
  const [completedScenarios, setCompletedScenarios] = useState([]); 
  const [score, setScore] = useState({ humanismo: 0, innovacion: 0 });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helpers
  const getCurrentLevel = () => EDUCATIONAL_LEVELS[currentLevelId];
  const getCurrentRoute = () => getCurrentLevel().routes.find(r => r.id === currentRouteId);
  const getCurrentScenario = () => {
    const route = getCurrentRoute();
    return route ? route.scenarios.find(s => s.id === currentScenarioId) : null;
  };

  const handleSelectLevel = (levelId) => {
    setCurrentLevelId(levelId);
    setGameState('routes');
    setCurrentRouteId(null);
    setCurrentScenarioId(null);
    setIsSidebarOpen(false); 
  };

  const handleStart = () => setGameState('routes');

  const handleSelectRoute = (routeId) => {
    setCurrentRouteId(routeId);
    setGameState('path');
  };

  const handleSelectScenario = (scenarioId) => {
    if (!completedScenarios.includes(scenarioId)) {
      const route = getCurrentRoute();
      const index = route.scenarios.findIndex(s => s.id === scenarioId);
      const prevScenarioId = index > 0 ? route.scenarios[index - 1].id : null;

      if (index === 0 || completedScenarios.includes(prevScenarioId)) {
        setCurrentScenarioId(scenarioId);
        setGameState('scenario');
        setSelectedOption(null);
      }
    }
  };

  const handleSubmitOption = () => {
    if (selectedOption) {
      setGameState('feedback');
      setScore(prev => ({
        humanismo: prev.humanismo + selectedOption.score.humanismo,
        innovacion: prev.innovacion + selectedOption.score.innovacion
      }));
    }
  };

  const handleContinue = () => {
    const scenario = getCurrentScenario();
    const newCompleted = [...completedScenarios, scenario.id];
    setCompletedScenarios(newCompleted);
    
    const route = getCurrentRoute();
    const allCompleted = route.scenarios.every(s => newCompleted.includes(s.id));
    
    if (allCompleted) {
      setGameState('summary');
    } else {
      setGameState('path');
    }
  };

  const handleRetry = () => {
    setGameState('scenario');
    setSelectedOption(null);
  };
  
  const handleBackToRoutes = () => setGameState('routes');

  // --- SUBCOMPONENTS ---

  const Sidebar = () => (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white leading-tight">Simulador<br/>NEM v4.0</h1>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">Estructura Académica</div>
          <nav className="space-y-2">
            {Object.values(EDUCATIONAL_LEVELS).map((level) => {
              const isActive = currentLevelId === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => handleSelectLevel(level.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all text-left
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                      : 'hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <div className={`${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {level.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{level.shortTitle}</div>
                    <div className={`text-[10px] uppercase font-bold tracking-wider mt-1 ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {level.routes.length} Rutas formativas
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-5 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-bold text-purple-400"><Heart className="w-4 h-4"/> {score.humanismo}</span>
            <span className="flex items-center gap-2 font-bold text-blue-400"><Zap className="w-4 h-4"/> {score.innovacion}</span>
          </div>
          <div className="text-center text-[10px] uppercase tracking-widest font-bold text-slate-600 mt-2">
            Puntuación Pedagógica
          </div>
        </div>
      </aside>
    </>
  );

  // --- VIEWS ---

  const WelcomeView = () => (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center relative overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-5 pointer-events-none">
          <Globe className="w-[500px] h-[500px] text-indigo-900" />
      </div>
      <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-4xl w-full border-t-8 border-indigo-600 relative z-10">
        
        <div className="mb-8 flex justify-center">
          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 shadow-inner">
            <Cpu className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">Comunidad Educativa Digital</h1>
        <h2 className="text-xl md:text-2xl text-indigo-600 font-bold mb-8 uppercase tracking-widest">Simulador Docente Especializado</h2>
        <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-3xl mx-auto">
          Plataforma inmersiva adaptada a la <strong>Nueva Escuela Mexicana</strong>. Desarrolla tu práctica docente explorando áreas de especialización independientes, con líneas de progresión por niveles formativos en Secundaria y Bachillerato.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
             <Layers className="w-8 h-8 text-pink-600 mb-4"/>
             <h3 className="font-bold text-slate-800 text-sm mb-2">Múltiples Áreas</h3>
             <p className="text-xs text-slate-500 leading-relaxed">Currículum y campos separados para un análisis profundo.</p>
           </div>
           <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow ring-2 ring-indigo-500/20">
             <Activity className="w-8 h-8 text-indigo-600 mb-4"/>
             <h3 className="font-bold text-indigo-900 text-sm mb-2">Línea de Progresión</h3>
             <p className="text-xs text-indigo-700 leading-relaxed">Avanza visualmente a través de los niveles de complejidad y fases.</p>
           </div>
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
             <CheckCircle className="w-8 h-8 text-amber-600 mb-4"/>
             <h3 className="font-bold text-slate-800 text-sm mb-2">4 Estrategias de Reto</h3>
             <p className="text-xs text-slate-500 leading-relaxed">Aprende a diferenciar la didáctica tradicional, instrumental, IA superficial y la IA Óptima NEM.</p>
           </div>
        </div>

        <button 
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-12 rounded-2xl text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-indigo-600/30 flex items-center justify-center mx-auto"
        >
          Iniciar Experiencia Formativa <ArrowRight className="ml-3 w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const RoutesView = () => {
    const level = getCurrentLevel();
    return (
      <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            {level.icon} Nivel Activo: {level.shortTitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">{level.title}</h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl">{level.description}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {level.routes.map((route) => {
            const completedCount = route.scenarios.filter(s => completedScenarios.includes(s.id)).length;
            const totalCount = route.scenarios.length;
            const progress = (completedCount / totalCount) * 100;

            return (
            <div 
              key={route.id}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all cursor-pointer group flex flex-col h-full"
              onClick={() => handleSelectRoute(route.id)}
            >
              <div className={`p-8 ${route.color} flex items-start justify-between flex-1 relative overflow-hidden`}>
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="bg-white/40 p-4 rounded-2xl backdrop-blur-md shadow-sm text-current w-fit">
                    {route.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold leading-tight mb-2 text-current drop-shadow-sm">{route.title}</h3>
                    <p className="font-semibold text-sm leading-relaxed opacity-80">{route.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white flex flex-col justify-end">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5"/> Avance de Ruta
                  </span>
                  <span className="font-black text-slate-700 text-base">
                    {completedCount} / {totalCount}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${route.buttonColor.split(' ')[0]}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    );
  };

  const PathView = () => {
    const route = getCurrentRoute();
    
    const levelGroups = [...new Set(route.scenarios.map(s => s.levelGroup))];

    return (
      <div className="flex flex-col min-h-full bg-slate-50/50">
        <div className={`px-6 py-8 md:px-12 md:py-10 ${route.color} shadow-sm z-10 sticky top-0 backdrop-blur-xl bg-opacity-95 border-b border-white/20`}>
          <div className="max-w-5xl mx-auto">
            <button onClick={handleBackToRoutes} className="flex items-center text-[11px] font-bold text-slate-900 opacity-60 hover:opacity-100 transition-opacity mb-4 uppercase tracking-widest bg-black/5 px-4 py-2 rounded-full w-fit">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Volver a Especialidades
            </button>
            <h2 className="text-3xl md:text-5xl font-black flex items-center gap-4 drop-shadow-sm text-balance">
              {route.icon} {route.title}
            </h2>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-12 w-full max-w-5xl mx-auto">
           
           {levelGroups.map((groupName, groupIndex) => {
              const scenariosInGroup = route.scenarios.filter(s => s.levelGroup === groupName);
              const completedInGroup = scenariosInGroup.filter(s => completedScenarios.includes(s.id)).length;
              
              return (
                <div key={groupName} className="mb-20">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                     <div>
                       <h3 className="text-2xl font-black text-slate-800">{groupName}</h3>
                       <p className="text-sm text-slate-500 font-medium mt-1">Supera las fases formativas para completar este bloque.</p>
                     </div>
                     <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-3 shrink-0">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fases Logradas</span>
                       <span className="text-xl font-black text-indigo-600">{completedInGroup} / {scenariosInGroup.length}</span>
                     </div>
                  </div>

                  <div className="space-y-12 relative py-4">
                     <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1.5 bg-slate-200 transform md:-translate-x-1/2 z-0 rounded-full"></div>
                     
                     {scenariosInGroup.map((scenario) => {
                       const globalIndex = route.scenarios.findIndex(s => s.id === scenario.id);
                       const isCompleted = completedScenarios.includes(scenario.id);
                       const isLocked = globalIndex > 0 && !completedScenarios.includes(route.scenarios[globalIndex - 1].id);
                       const isCurrent = !isCompleted && !isLocked;
                       const isEven = globalIndex % 2 === 0;

                       return (
                         <div key={scenario.id} className={`flex items-center ${isEven ? 'flex-row' : 'md:flex-row-reverse flex-row'} justify-start md:justify-between group relative`}>
                           
                           <div className={`hidden md:block absolute top-1/2 w-40 border-t-[3px] border-dashed transition-all duration-500 z-0 ${isCompleted ? 'border-emerald-300' : isCurrent ? 'border-indigo-400' : 'border-slate-200'} ${isEven ? 'right-1/2 mr-8' : 'left-1/2 ml-8'}`}></div>

                           <div className={`hidden md:flex flex-col w-5/12 z-10 ${isEven ? 'items-end text-right pr-16' : 'items-start text-left pl-16'}`}>
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3 border ${isLocked ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-indigo-700 border-indigo-100 shadow-sm'}`}>
                                {scenario.discipline}
                              </div>
                              <h3 className={`font-black text-2xl mb-2 leading-tight ${isLocked ? 'text-slate-300' : 'text-slate-800'}`}>{scenario.title}</h3>
                           </div>

                           <button 
                            onClick={() => handleSelectScenario(scenario.id)}
                            disabled={isLocked || isCompleted}
                            className={`
                              w-20 h-20 rounded-full flex items-center justify-center border-[6px] transition-all duration-300 transform z-20 relative shrink-0 shadow-md
                              ${isCompleted ? 'bg-emerald-500 border-white text-white' : ''}
                              ${isCurrent ? `${route.buttonColor} border-white shadow-2xl scale-[1.2] ring-8 ring-indigo-500/20 text-white animate-pulse` : ''}
                              ${isLocked ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed' : ''}
                              ${!isLocked && !isCompleted ? 'cursor-pointer hover:scale-110' : ''}
                            `}
                           >
                             {isCompleted ? <CheckCircle className="w-10 h-10"/> : isLocked ? <Lock className="w-8 h-8"/> : <span className="font-black text-3xl">{globalIndex + 1}</span>}
                           </button>

                           <div className={`ml-8 md:ml-0 md:w-5/12 z-10 flex-1 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 text-right'}`}>
                              <div className="md:hidden mb-2">
                                <div className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2 border ${isLocked ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-white text-indigo-700 border-indigo-100 shadow-sm'}`}>
                                  Fase {globalIndex + 1}
                                </div>
                                <h3 className={`font-black text-xl leading-tight ${isLocked ? 'text-slate-300' : 'text-slate-800'}`}>{scenario.title}</h3>
                              </div>
                              
                              <div className={`p-6 rounded-3xl text-sm leading-relaxed transition-all duration-500 ${isLocked ? 'bg-slate-50/50 text-slate-400 border border-slate-100' : 'bg-white shadow-xl hover:shadow-2xl border border-slate-100 text-slate-600'}`}>
                                {isLocked ? (
                                  <span className="flex items-center gap-2"><Lock className="w-4 h-4"/> Nivel bloqueado. Completa la fase anterior.</span>
                                ) : (
                                  <span className="line-clamp-4 text-base">{scenario.context}</span>
                                )}
                              </div>
                           </div>
                         </div>
                       )
                     })}
                  </div>
                </div>
              );
           })}
        </div>
      </div>
    );
  };

  const ScenarioView = () => {
    const route = getCurrentRoute();
    const scenario = getCurrentScenario();
    
    return (
      <div className="min-h-full bg-slate-100 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white max-w-6xl w-full rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-slate-200">
          
          <div className={`${route.buttonColor} p-10 md:p-14 lg:w-5/12 text-white flex flex-col relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-[80px]"></div>
                 <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black rounded-full blur-[80px]"></div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <button onClick={() => setGameState('path')} className="flex items-center gap-2 mb-10 opacity-70 hover:opacity-100 transition-opacity text-[11px] font-bold uppercase tracking-widest w-fit bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                   <ArrowRight className="w-4 h-4 rotate-180" /> Pausar y Volver
                </button>
                
                <div className="mb-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-md w-fit border border-white/10">
                  <Library className="w-4 h-4"/> {scenario.discipline}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1] text-balance drop-shadow-md">{scenario.title}</h2>
                
                <div className="mb-10 opacity-90 font-semibold tracking-wide text-sm">
                  {scenario.levelGroup}
                </div>

                <div className="mt-auto bg-black/15 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-inner">
                  <h4 className="font-bold mb-4 flex items-center text-xs uppercase tracking-widest text-indigo-100">
                    <MapPin className="w-5 h-5 mr-3 text-white"/> Diagnóstico Áulico
                  </h4>
                  <p className="text-lg opacity-100 leading-relaxed font-medium">{scenario.context}</p>
                </div>
              </div>
          </div>

          <div className="p-10 md:p-14 lg:w-7/12 flex flex-col bg-slate-50">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-100/50 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest mb-5 border border-indigo-200">
                  <Activity className="w-4 h-4"/> Reto Metodológico
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight text-balance">
                  {scenario.problem}
                </h3>
              </div>

              <div className="space-y-4 mb-auto">
               {scenario.options.map((option) => {
                 const isSelected = selectedOption?.id === option.id;
                 return (
                 <button
                   key={option.id}
                   onClick={() => setSelectedOption(option)}
                   className={`w-full p-5 rounded-[1.5rem] border-2 text-left transition-all duration-300 flex items-start group relative overflow-hidden ${
                     isSelected
                       ? `border-indigo-500 bg-indigo-50/80 shadow-lg scale-[1.01]`
                       : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
                   }`}
                 >
                   <div className={`w-8 h-8 rounded-full border-2 mr-5 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors z-10 relative bg-white shadow-sm ${
                     isSelected ? 'border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
                   }`}>
                     {isSelected && <div className="w-4 h-4 bg-indigo-600 rounded-full shadow-inner" />}
                   </div>
                   
                   <span className={`text-base lg:text-lg leading-relaxed z-10 relative pr-2 ${isSelected ? 'text-indigo-950 font-bold' : 'text-slate-600 font-medium group-hover:text-slate-800'}`}>
                     {option.text}
                   </span>

                   {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 to-transparent z-0"></div>}
                 </button>
                 )
               })}
              </div>

              <div className="pt-8 mt-6 border-t border-slate-200">
                <button 
                  onClick={handleSubmitOption}
                  disabled={!selectedOption}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all transform flex items-center justify-center gap-3 ${
                    selectedOption 
                      ? 'bg-slate-900 text-white hover:bg-black hover:-translate-y-1 shadow-2xl shadow-slate-900/30' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Evaluar Decisión <ArrowRight className="w-6 h-6"/>
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  };

  const FeedbackView = () => {
    const isCorrect = selectedOption.isCorrect;
    
    return (
      <div className="min-h-full bg-slate-100 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white max-w-3xl w-full rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          
          <div className={`h-4 w-full ${isCorrect ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>

          <div className="p-10 md:p-14 text-center">
              <div className={`mx-auto w-28 h-28 rounded-full flex items-center justify-center mb-8 shadow-inner ${isCorrect ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                {isCorrect ? <Award className="w-14 h-14"/> : <Lightbulb className="w-14 h-14"/>}
              </div>
              
              <h2 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">
                {isCorrect ? '¡Decisión Óptima!' : 'Área de Oportunidad'}
              </h2>
              <p className="text-slate-500 mb-10 font-bold tracking-wide uppercase text-sm">Análisis Pedagógico (NEM)</p>
              
              <div className="bg-slate-50 rounded-3xl p-8 md:p-10 text-left mb-12 border border-slate-200 relative shadow-sm">
                <div className={`absolute top-0 left-0 w-2.5 h-full rounded-l-3xl ${isCorrect ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                <p className="text-slate-700 leading-relaxed text-xl font-medium">
                  {selectedOption.feedback}
                </p>
                
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="bg-white px-6 py-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Humanismo</div>
                    <div className="text-purple-600 font-black text-3xl">+{selectedOption.score.humanismo}</div>
                  </div>
                  <div className="bg-white px-6 py-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Innovación</div>
                    <div className="text-blue-600 font-black text-3xl">+{selectedOption.score.innovacion}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center w-full">
                {isCorrect ? (
                   <button onClick={handleContinue} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-900/20 transition-transform hover:-translate-y-1 flex items-center justify-center gap-3">
                     Guardar Avance y Continuar <ArrowRight className="w-6 h-6"/>
                   </button>
                ) : (
                  <button onClick={handleRetry} className="w-full bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-slate-900/20 transition-transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <RefreshCcw className="w-6 h-6"/> Reevaluar Estrategia
                  </button>
                )}
              </div>
          </div>
        </div>
      </div>
    );
  };

  const SummaryView = () => {
    const route = getCurrentRoute();
    
    return (
    <div className="min-h-full bg-slate-950 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="bg-white max-w-3xl w-full rounded-[3rem] shadow-2xl p-10 md:p-16 text-center relative z-10 border border-white/10">
        <Award className="w-32 h-32 text-amber-400 mx-auto mb-8 drop-shadow-xl" />
        
        <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">¡Ruta Completada!</h1>
        <h2 className="text-2xl font-bold text-indigo-600 mb-10 tracking-widest uppercase">{route.title}</h2>
        
        <p className="text-slate-600 text-xl mb-12 leading-relaxed font-medium">
          Has integrado exitosamente la innovación pedagógica en el ciclo formativo de esta área. Tu práctica fomenta el pensamiento crítico y empodera al estudiante frente a los retos de su comunidad.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
            <div className="text-6xl font-black text-purple-600 mb-3">{score.humanismo}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Humanismo</div>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
            <div className="text-6xl font-black text-blue-600 mb-3">{score.innovacion}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Innovación</div>
          </div>
        </div>

        <button 
          onClick={handleBackToRoutes}
          className="bg-slate-900 hover:bg-black text-white font-black py-6 px-12 rounded-2xl text-xl transition-transform hover:-translate-y-1 shadow-2xl shadow-slate-900/30 w-full"
        >
          Explorar Otra Ruta Formativa
        </button>
      </div>
    </div>
  )};

  return (
    <div className="font-sans antialiased text-slate-900 flex h-screen bg-slate-100 overflow-hidden">
      {gameState !== 'welcome' && <Sidebar />}

      <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-slate-50/50">
        
        {gameState !== 'welcome' && !isSidebarOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 p-5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-3 font-black text-slate-800 text-lg tracking-tight">
              <Cpu className="w-6 h-6 text-indigo-600"/> Simulador NEM
            </div>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="flex-1">
          {gameState === 'welcome' && <WelcomeView />}
          {gameState === 'routes' && <RoutesView />}
          {gameState === 'path' && <PathView />}
          {gameState === 'scenario' && <ScenarioView />}
          {gameState === 'feedback' && <FeedbackView />}
          {gameState === 'summary' && <SummaryView />}
        </div>
      </main>
    </div>
  );
};

export default App;
