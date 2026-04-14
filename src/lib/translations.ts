export type Language = 'en' | 'am';

export const translations = {
  en: {
    // Branding
    projectTitle: 'STRATA ENGINE',
    projectSubtitle: 'Precision Sampling System',
    
    // Nav/Sidebar
    controls: 'Controls',
    dataEngine: 'Data Engine',
    insights: 'Insights',
    instanceStatus: 'Instance Status',
    nodeActive: 'NODE_ACTIVE',
    exportCsv: 'Export CSV',
    
    // Metrics
    representativeness: 'Representativeness',
    marginOfError: 'Margin of Error (95%)',
    relativeBias: 'Relative Bias',
    klDivergence: 'KL Divergence',
    accuracyVsPop: 'Accuracy vs. Population',
    confidenceThreshold: 'Confidence threshold',
    systemicDeviation: 'Systemic deviation',
    infoEntropy: 'Information entropy',
    
    // Sampling Controls
    parameters: 'Parameters',
    sampleSize: 'Sample Size ($n$)',
    algorithm: 'Algorithm',
    activeConfidence: 'Active Confidence',
    confidenceNote: '95.0% Confidence Interval applied.',
    stratificationKey: 'Stratification Key',
    methods: {
      Simple: 'Random',
      Stratified: 'Stratified',
      Systematic: 'Systematic',
      Reservoir: 'Reservoir'
    },
    descriptions: {
      Simple: 'Every member of the population has an equal chance of being selected.',
      Stratified: 'The population is divided into subgroups (strata) and samples are taken from each.',
      Systematic: 'Selecting every k-th individual from a randomly ordered list.',
      Reservoir: 'A randomized algorithm for choosing a sample of k items from a list of n items, where n is a very large or unknown number.'
    },
    
    // Data Table
    extractionBuffer: 'Extraction Buffer',
    liveRegistry: 'Live Registry',
    index: 'Index',
    systemId: 'System ID',
    incomeDelta: 'Income Delta',
    segment: 'Segment',
    cluster: 'Cluster',
    mapping: 'Mapping',
    bufferEmpty: 'Buffer Empty // Initialization Required',
    displaying: 'Displaying records',
    
    // Tech Specs
    techSpecs: 'Technical Specs',
    precision: 'Precision',
    popCount: 'Population ($N$)',
    sampleCount: 'Sample Count ($n$)',
    samplingRatio: 'Sampling Ratio',
    mse: 'MSE',
    stdError: 'Standard Error',
    entropy: 'Entropy (D_KL)',
    utilization: 'Utilization',
    
    // Visualizer
    visualizer: {
      entityMapping: 'Entity Mapping Index',
      sampledMatrix: 'Sampled Matrix',
      referencePop: 'Reference Population',
      dynamicDensity: 'Dynamic Density',
      densityNote: 'Comparison of Population Probability Density vs. Local Sample Extraction.',
      activeSample: 'Active Sample',
      populationBase: 'Population Base',
      units: 'units'
    },
    
    // Glossary
    statisticalInsights: 'Statistical Insights',
    glossaryItems: [
      {
        title: 'Representativeness',
        content: 'How accurately a sample reflects the characteristics of the entire population. High representativeness minimizes selection bias.',
        formula: '$$R = 100 - (\\text{Bias Penalty})$$'
      },
      {
        title: 'KL Divergence',
        content: 'A measure (in bits/nats) of how the sample distribution "diverges" from the population distribution. It quantifies information loss when approximating P with Q.',
        formula: '$$D_{KL}(P || Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$$'
      },
      {
        title: 'Standard Error (SE)',
        content: 'The standard deviation of the sampling distribution. It measures how much the sample mean is expected to vary from the true population mean.',
        formula: '$$SE = \\frac{\\sigma}{\\sqrt{n}}$$'
      },
      {
        title: 'Relative Bias',
        content: 'The percentage difference between the sample mean and the true population mean, indicating the direction and magnitude of systematic error.',
        formula: '$$\\text{Bias} = \\frac{\\bar{x} - \\mu}{\\mu} \\times 100$$'
      }
    ]
  },
  am: {
    // Branding
    projectTitle: 'ስትራታ ሞተር',
    projectSubtitle: 'ትክክለኛ የናሙና ሥርዓት',
    
    // Nav/Sidebar
    controls: 'መቆጣጠሪያዎች',
    dataEngine: 'የመረጃ ሞተር',
    insights: 'ግንዛቤዎች',
    instanceStatus: 'የአሁኑ ሁኔታ',
    nodeActive: 'ሥርዓቱ_ተነስቷል',
    exportCsv: 'ፋይሉን አውጣ',
    
    // Metrics
    representativeness: 'ወካይነት',
    marginOfError: 'የስህተት ህዳግ (95%)',
    relativeBias: 'አንጻራዊ አድልዎ',
    klDivergence: 'የኬኤል ልዩነት',
    accuracyVsPop: 'ከጠቅላላው አንጻር ያለው ትክክለኛነት',
    confidenceThreshold: 'የመተማመኛ ገደብ',
    systemicDeviation: 'ሥርዓታዊ ልዩነት',
    infoEntropy: 'የመረጃ እንትሮፒ',
    
    // Sampling Controls
    parameters: 'መለኪያዎች',
    sampleSize: 'የናሙና መጠን ($n$)',
    algorithm: 'አልጎሪዝም',
    activeConfidence: 'ንቁ መተማመኛ',
    confidenceNote: '95.0% የመተማመኛ ህዳግ ጥቅም ላይ ውሏል።',
    stratificationKey: 'ንብርብራዊ ቁልፍ',
    methods: {
      Simple: 'ቀላል የዕድል',
      Stratified: 'ንብርብራዊ',
      Systematic: 'ስልታዊ',
      Reservoir: 'ሪዘርቮር'
    },
    descriptions: {
      Simple: 'እያንዳንዱ የህብረተሰብ ክፍል የመመረጥ እኩል ዕድል አለው።',
      Stratified: 'ህዝቡ በንዑስ ቡድኖች (ንብርብሮች) ተከፍሎ ከእያንዳንዱ ንብርብር ናሙና ይወሰዳል።',
      Systematic: 'በአንድ በተወሰነ ቅደም ተከተል ከተዘረዘሩ ሰዎች መካከል በየተወሰነ ልዩነት ሰዎችን መምረጥ።',
      Reservoir: 'ብዛቱ በውል ከማይታወቅ መረጃ መካከል ናሙናን በቋሚነት ለመምረጥ የሚያስችል ዘዴ።'
    },
    
    // Data Table
    extractionBuffer: 'የውሂብ ማጠራቀሚያ',
    liveRegistry: 'ቀጥታ መዝገብ',
    index: 'ተ.ቁ',
    systemId: 'የሥርዓት መለያ',
    incomeDelta: 'የገቢ ልዩነት',
    segment: 'ክፍል',
    cluster: 'ቡድን',
    mapping: 'ካርታ',
    bufferEmpty: 'ማጠራቀሚያው ባዶ ነው // ማስጀመር ያስፈልጋል',
    displaying: 'መረጃዎች ታይተዋል',
    
    // Tech Specs
    techSpecs: 'ቴክኒካዊ መረጃዎች',
    precision: 'ትክክለኛነት',
    popCount: 'ጠቅላላ ብዛት ($N$)',
    sampleCount: 'የናሙና ብዛት ($n$)',
    samplingRatio: 'የናሙና ሬሾ',
    mse: 'ኤምኤስኢ (MSE)',
    stdError: 'መደበኛ ስህተት (SE)',
    entropy: 'እንትሮፒ (D_KL)',
    utilization: 'አጠቃቀም',
    
    // Visualizer
    visualizer: {
      entityMapping: 'የአባላት ካርታ ማውጫ',
      sampledMatrix: 'የተወሰደ ናሙና',
      referencePop: 'ጠቅላላ ህዝብ',
      dynamicDensity: 'ተለዋዋጭ ስርጭት',
      densityNote: 'በጠቅላላው ህዝብ እና በናሙና ስርጭት መካከል ያለው ንፅፅር።',
      activeSample: 'ንቁ ናሙና',
      populationBase: 'የመነሻ ህዝብ',
      units: 'አባላት'
    },
    
    // Glossary
    statisticalInsights: 'ስታቲስቲካዊ ግንዛቤዎች',
    glossaryItems: [
      {
        title: 'ወካይነት (Representativeness)',
        content: 'አንድ ናሙና የጠቅላላውን ህዝብ ባህሪያት ምን ያህል በትክክል እንደሚያንጸባርቅ የሚገልጽ መለኪያ። ከፍተኛ ወካይነት መኖሩ የአድልዎ ስጋትን ይቀንሳል።',
        formula: '$$R = 100 - (\\text{Bias Penalty})$$'
      },
      {
        title: 'የኬኤል ልዩነት (KL Divergence)',
        content: 'አንድ ናሙና ከጠቅላላው የመረጃ ስርጭት ምን ያህል እንደሚርቅ የሚለካበት መንገድ። መረጃን ወደ ናሙና ስንቀይር ምን ያህል መረጃ እንደጠፋ ያሳያል።',
        formula: '$$D_{KL}(P || Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$$'
      },
      {
        title: 'መደበኛ ስህተት (SE)',
        content: 'የናሙና ስርጭት መደበኛ መዛባት። የናሙናው አማካይ ከእውነተኛው የህዝብ አማካይ ምን ያህል ሊለይ እንደሚችል ይለካል።',
        formula: '$$SE = \\frac{\\sigma}{\\sqrt{n}}$$'
      },
      {
        title: 'አንጻራዊ አድልዎ (Relative Bias)',
        content: 'በናሙና አማካይ እና በእውነተኛው የህዝብ አማካይ መካከል ያለው የፐርሰንት ልዩነት፣ ይህም የስርዓቱን ስህተት አቅጣጫ እና መጠን ያሳያል።',
        formula: '$$\\text{Bias} = \\frac{\\bar{x} - \\mu}{\\mu} \\times 100$$'
      }
    ]
  }
};
