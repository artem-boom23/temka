const PROGRAMS = [
  {
    id: 'tinkoff-card',
    name: 'Тинькофф',
    logo: 'assets/logos/tinkoff.svg',
    category: 'banks',
    reward: 1000,
    rewardText: 'до 1 000₽',
    rewardPer: 'за друга',
    difficulty: 'easy',
    difficultyText: 'Легко',
    description: 'Приглашай друзей оформить карту Тинькофф. Деньги приходят сразу после активации карты.',
    tags: ['карта', 'банк', 'кешбэк'],
    isHot: true,
    isNew: false,
    conversionEstimate: 30,
    details: {
      howItWorks: 'Получаешь реферальную ссылку → друг открывает карту по ней → ты получаешь вознаграждение после первой оплаты картой.',
      conditions: [
        'Друг должен быть новым клиентом Тинькофф',
        'Должен совершить первую покупку в течение 30 дней',
        'Вознаграждение приходит на карту в течение 7 дней'
      ],
      minPayout: 1000,
      payoutTime: '7 дней'
    }
  },
  {
    id: 'yandex-food-courier',
    name: 'Яндекс Еда',
    logo: 'assets/logos/yandex-food.svg',
    category: 'delivery',
    reward: 30000,
    rewardText: 'до 30 000₽',
    rewardPer: 'за курьера',
    difficulty: 'medium',
    difficultyText: 'Средне',
    description: 'Приводи курьеров в Яндекс Еду. Одна из самых высоких выплат на рынке реферальных программ.',
    tags: ['курьер', 'доставка', 'яндекс'],
    isHot: true,
    isNew: false,
    conversionEstimate: 15,
    details: {
      howItWorks: 'Зовёшь человека зарегистрироваться курьером → он проходит регистрацию → выполняет первые заказы → ты получаешь выплату.',
      conditions: [
        'Курьер должен быть новым в сервисе',
        'Должен выполнить определённое количество заказов',
        'Размер выплаты зависит от города'
      ],
      minPayout: 5000,
      payoutTime: '30 дней'
    }
  },
  {
    id: 'ozon-seller',
    name: 'Ozon',
    logo: 'assets/logos/ozon.svg',
    category: 'marketplaces',
    reward: 15000,
    rewardText: 'до 15 000₽',
    rewardPer: 'за продавца',
    difficulty: 'hard',
    difficultyText: 'Сложно',
    description: 'Приводи новых продавцов на маркетплейс Ozon. Выплата после первых продаж.',
    tags: ['маркетплейс', 'продавец', 'бизнес'],
    isHot: false,
    isNew: false,
    conversionEstimate: 5,
    details: {
      howItWorks: 'Находишь людей, которые хотят продавать онлайн → регистрируешь их через свою ссылку → они начинают продавать → ты получаешь процент.',
      conditions: [
        'Продавец должен быть новым на Ozon',
        'Должен сделать первые продажи в течение 90 дней',
        'Выплата зависит от оборота приведённого продавца'
      ],
      minPayout: 3000,
      payoutTime: '60 дней'
    }
  },
  {
    id: 'skyeng',
    name: 'Skyeng',
    logo: 'assets/logos/skyeng.svg',
    category: 'education',
    reward: 4000,
    rewardText: 'до 4 000₽',
    rewardPer: 'за ученика',
    difficulty: 'easy',
    difficultyText: 'Легко',
    description: 'Приводи новых учеников на платформу Skyeng для изучения английского.',
    tags: ['английский', 'обучение', 'онлайн'],
    isHot: false,
    isNew: true,
    conversionEstimate: 20,
    details: {
      howItWorks: 'Делишься ссылкой → друг записывается на пробный урок → оплачивает курс → тебе начисляется вознаграждение.',
      conditions: [
        'Ученик должен быть новым клиентом Skyeng',
        'Должен оплатить курс',
        'Выплата через 14 дней после оплаты'
      ],
      minPayout: 4000,
      payoutTime: '14 дней'
    }
  },
  {
    id: 'sber-prime',
    name: 'СберПрайм',
    logo: 'assets/logos/sber.svg',
    category: 'banks',
    reward: 500,
    rewardText: 'до 500₽',
    rewardPer: 'за подписку',
    difficulty: 'easy',
    difficultyText: 'Легко',
    description: 'Приглашай подключить подписку СберПрайм. Быстро конвертируется — у многих уже есть Сбер.',
    tags: ['подписка', 'сбер', 'банк'],
    isHot: false,
    isNew: false,
    conversionEstimate: 40,
    details: {
      howItWorks: 'Отправляешь ссылку → друг активирует подписку СберПрайм → получаешь вознаграждение.',
      conditions: [
        'Друг должен быть новым подписчиком',
        'Должен оплатить первый месяц',
        'Выплата в течение 14 дней'
      ],
      minPayout: 500,
      payoutTime: '14 дней'
    }
  },
  {
    id: 'alfa-card',
    name: 'Альфа-Банк',
    logo: 'assets/logos/alfa.svg',
    category: 'banks',
    reward: 2000,
    rewardText: 'до 2 000₽',
    rewardPer: 'за клиента',
    difficulty: 'easy',
    difficultyText: 'Легко',
    description: 'Приводи новых клиентов Альфа-Банка. Одна из лучших конверсий среди банков.',
    tags: ['карта', 'банк', 'альфа'],
    isHot: false,
    isNew: true,
    conversionEstimate: 25,
    details: {
      howItWorks: 'Приглашаешь друга открыть карту Альфа-Банка → он проходит оформление → совершает первые покупки → вознаграждение тебе.',
      conditions: [
        'Клиент должен быть новым для Альфа-Банка',
        'Должен совершить покупки на сумму от 5000₽',
        'Выплата в течение 30 дней'
      ],
      minPayout: 2000,
      payoutTime: '30 дней'
    }
  },
  {
    id: 'samokat-courier',
    name: 'Самокат',
    logo: 'assets/logos/samokat.svg',
    category: 'delivery',
    reward: 10000,
    rewardText: 'до 10 000₽',
    rewardPer: 'за курьера',
    difficulty: 'medium',
    difficultyText: 'Средне',
    description: 'Зови знакомых работать курьером в Самокат. Стабильная программа с хорошими выплатами.',
    tags: ['курьер', 'доставка', 'самокат'],
    isHot: false,
    isNew: false,
    conversionEstimate: 18,
    details: {
      howItWorks: 'Приглашаешь работать → курьер регистрируется → отрабатывает минимальное количество смен → получаешь бонус.',
      conditions: [
        'Новый курьер для сервиса',
        'Должен отработать минимум 10 смен',
        'Выплата после выполнения условий'
      ],
      minPayout: 5000,
      payoutTime: '45 дней'
    }
  },
  {
    id: 'tinkoff-invest',
    name: 'Тинькофф Инвестиции',
    logo: 'assets/logos/tinkoff.svg',
    category: 'investments',
    reward: 1000,
    rewardText: 'до 1 000₽',
    rewardPer: 'за инвестора',
    difficulty: 'medium',
    difficultyText: 'Средне',
    description: 'Приводи людей, которые хотят начать инвестировать. Бонус за первое пополнение счёта.',
    tags: ['инвестиции', 'брокер', 'акции'],
    isHot: false,
    isNew: false,
    conversionEstimate: 15,
    details: {
      howItWorks: 'Делишься реферальной ссылкой → друг открывает брокерский счёт → пополняет на любую сумму → ты получаешь акции или кешбэк.',
      conditions: [
        'Новый клиент брокерского счёта',
        'Должен пополнить счёт в течение 30 дней',
        'Вознаграждение акциями или рублями'
      ],
      minPayout: 500,
      payoutTime: '30 дней'
    }
  },
  {
    id: 'skillbox',
    name: 'Skillbox',
    logo: 'assets/logos/skillbox.svg',
    category: 'education',
    reward: 5000,
    rewardText: 'до 5 000₽',
    rewardPer: 'за студента',
    difficulty: 'medium',
    difficultyText: 'Средне',
    description: 'Приводи студентов на онлайн-курсы Skillbox. Одни из лучших выплат в категории обучения.',
    tags: ['курсы', 'обучение', 'skillbox'],
    isHot: false,
    isNew: false,
    conversionEstimate: 10,
    details: {
      howItWorks: 'Даёшь ссылку → человек покупает курс → ты получаешь процент от продажи.',
      conditions: [
        'Новый студент Skillbox',
        'Должен оплатить курс',
        'Процент от стоимости курса'
      ],
      minPayout: 1000,
      payoutTime: '30 дней'
    }
  },
  {
    id: 'wildberries-seller',
    name: 'Wildberries',
    logo: 'assets/logos/wb.svg',
    category: 'marketplaces',
    reward: 12000,
    rewardText: 'до 12 000₽',
    rewardPer: 'за продавца',
    difficulty: 'hard',
    difficultyText: 'Сложно',
    description: 'Приводи продавцов на WB. Сложно конвертировать, но выплаты очень высокие.',
    tags: ['маркетплейс', 'продавец', 'вб'],
    isHot: false,
    isNew: false,
    conversionEstimate: 5,
    details: {
      howItWorks: 'Находишь потенциальных продавцов → регистрируешь через ссылку → они начинают торговать → получаешь вознаграждение.',
      conditions: [
        'Новый продавец на WB',
        'Должен сделать продажи в первые 90 дней',
        'Выплата зависит от оборота'
      ],
      minPayout: 5000,
      payoutTime: '90 дней'
    }
  },
  {
    id: 'avito',
    name: 'Авито',
    logo: 'assets/logos/avito.svg',
    category: 'marketplaces',
    reward: 3000,
    rewardText: 'до 3 000₽',
    rewardPer: 'за продавца',
    difficulty: 'medium',
    difficultyText: 'Средне',
    description: 'Приводи пользователей, которые хотят продавать на Авито Pro.',
    tags: ['авито', 'продажи', 'объявления'],
    isHot: false,
    isNew: true,
    conversionEstimate: 20,
    details: {
      howItWorks: 'Регистрируешь через ссылку → пользователь активирует Pro-аккаунт → размещает объявления → ты получаешь выплату.',
      conditions: [
        'Новый Pro-пользователь',
        'Должен оплатить Pro-подписку',
        'Выплата в течение 14 дней'
      ],
      minPayout: 1500,
      payoutTime: '14 дней'
    }
  },
  {
    id: 'geekbrains',
    name: 'GeekBrains',
    logo: 'assets/logos/geekbrains.svg',
    category: 'education',
    reward: 6000,
    rewardText: 'до 6 000₽',
    rewardPer: 'за студента',
    difficulty: 'medium',
    difficultyText: 'Средне',
    description: 'Платформа по IT-образованию. Высокие чеки курсов — значит и выплаты выше среднего.',
    tags: ['IT', 'курсы', 'программирование'],
    isHot: true,
    isNew: false,
    conversionEstimate: 12,
    details: {
      howItWorks: 'Приводишь человека который хочет войти в IT → он покупает курс → ты получаешь процент.',
      conditions: [
        'Новый студент GeekBrains',
        'Должен купить курс по ссылке',
        'Выплата % от стоимости'
      ],
      minPayout: 2000,
      payoutTime: '30 дней'
    }
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Все темки', emoji: '🔥' },
  { id: 'banks', label: 'Банки', emoji: '💳' },
  { id: 'delivery', label: 'Доставка', emoji: '🛵' },
  { id: 'marketplaces', label: 'Маркетплейсы', emoji: '📦' },
  { id: 'education', label: 'Обучение', emoji: '📚' },
  { id: 'investments', label: 'Инвестиции', emoji: '📈' }
];

const STATS = {
  totalPrograms: 12,
  maxEarning: 30000,
  avgEarning: 5000,
  totalPaid: '2 400 000'
};
