export interface Testimonial {
  id: string;
  name: string;
  role: {
    tr: string;
    en: string;
  };
  rating: number;
  text: {
    tr: string;
    en: string;
  };
}

export interface SkillItem {
  title: {
    tr: string;
    en: string;
  };
  bullets: {
    tr: string[];
    en: string[];
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  period: string;
  role: {
    tr: string;
    en: string;
  };
  details: {
    tr: string[];
    en: string[];
  };
}

export interface EducationItem {
  id: string;
  degree: {
    tr: string;
    en: string;
  };
  institution: string;
  period: string;
}

export interface AwardItem {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
}

export const portfolioData = {
  name: "Hakan Behzadi",
  title: {
    tr: "İngilizce Öğretmeni",
    en: "English Teacher"
  },
  contact: {
    phone: "0552 482 64 48",
    phoneFormatted: "+90 552 482 64 48",
    email: "hakan.behzadi@email.com", // Placeholder to enrich, but highlight phone
    address: {
      tr: "Kavaklı Mah. Beylikdüzü / İstanbul",
      en: "Kavakli District, Beylikduzu / Istanbul"
    },
    whatsappUrl: "https://wa.me/905524826448"
  },
  summary: {
    tr: "5 yılı aşkın deneyime sahip, dil okulları ve çevrim içi platformlarda aktif çalışmış bir İngilizce öğretmeniyim. Sınıf yönetimi, interaktif materyal geliştirme ve öğrenci motivasyonu konularında uzmanım. British Cambridge, IELTS, TOEFL ve YÖKDİL İngilizce gibi ulusal ve uluslararası sınavların hazırlık süreçlerine derinlemesine hakim bir öğretmen olarak, edindiğim bu geniş kapsamlı birikimi okulunuzun dinamik eğitim kadrosuna aktararak öğrencilerinizin akademik başarılarına katkı sağlamayı hedefliyorum.",
    en: "I am an English teacher with over 5 years of experience, having worked actively in language schools and online platforms. I specialize in classroom management, interactive materials development, and student motivation. As an instructor deeply well-versed in the preparation processes for national and international exams such as British Cambridge, IELTS, TOEFL, and YÖKDİL English, I aim to contribute to the academic success of students by transferring this comprehensive background to your school's dynamic faculty."
  },
  stats: [
    {
      value: "5+",
      label: { tr: "Yıllık Deneyim", en: "Years Experience" }
    },
    {
      value: "100%",
      label: { tr: "Öğrenci Memnuniyeti", en: "Student Satisfaction" }
    },
    {
      value: "2",
      label: { tr: "Dil Akademisi", en: "Language Academies" }
    },
    {
      value: "4+",
      label: { tr: "Sınav Uzmanlığı", en: "Exam Expertises" }
    }
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Safir İngilizce Akademisi",
      period: "2023 - 2025",
      role: {
        tr: "Kıdemli İngilizce Öğretmeni",
        en: "Senior English Teacher"
      },
      details: {
        tr: [
          "Bireysel ve kurumsal düzeyde ileri derece İngilizce dersleri verildi.",
          "IELTS, TOEFL ve YÖKDİL gibi uluslararası ve ulusal sınavlara hazırlık müfredatları geliştirildi.",
          "Yaratıcı ve interaktif eğitim materyalleri ile öğrenci başarısı %35 oranında artırıldı."
        ],
        en: [
          "Delivered advanced English courses for individual and corporate clients.",
          "Developed curriculum blueprints for international and national exams including IELTS, TOEFL, and YÖKDİL.",
          "Enhanced student retention and exam scores by 35% through custom-tailored interactive media."
        ]
      }
    },
    {
      id: "exp-2",
      company: "Mehrdad Dil Akademisi",
      period: "2020 - 2023",
      role: {
        tr: "İngilizce Öğretmeni",
        en: "English Teacher"
      },
      details: {
        tr: [
          "Genel İngilizce, İş İngilizcesi ve konuşma kulübü oturumları koordine edildi.",
          "Geleneksel ve çevrim içi sınıflarda etkin yönetim teknikleri uygulandı.",
          "Öğrencilerin sınav kaygısını azaltıcı motivasyon koçluğu sağlandı."
        ],
        en: [
          "Coordinated General English, Business English, and conversational speaking club structures.",
          "Applied effective classroom management methodologies in physical and online setups.",
          "Provided custom motivational coaching sessions to alleviate student exam anxiety."
        ]
      }
    }
  ] as ExperienceItem[],
  education: [
    {
      id: "edu-1",
      degree: {
        tr: "Yüksek Lisans",
        en: "Master's Degree"
      },
      institution: "İstanbul Aydın Üniversitesi",
      period: "2025 - 2026"
    },
    {
      id: "edu-2",
      degree: {
        tr: "4 Yıllık Lisans",
        en: "Bachelor's Degree"
      },
      institution: "İstanbul Beykent Üniversitesi",
      period: "2021 - 2025"
    }
  ] as EducationItem[],
  skills: [
    {
      title: {
        tr: "Sınıf Yönetimi",
        en: "Classroom Management"
      },
      bullets: {
        tr: [
          "Öğrencilere, uygun raporlama formatları aracılığıyla önceki ve gelecek dersleri etkili bir şekilde özetlemeyi öğretir.",
          "Öğrencilerin bütünsel gelişimi için yardımcı öğretmenler ve velilerle iş birliği yapar.",
          "Öğrenciler için güvenli ve kapsayıcı bir öğrenme ortamı sağlar."
        ],
        en: [
          "Instructs students to summarize prior and upcoming lessons effectively utilizing progress report formats.",
          "Collaborates extensively with teaching partners and parents for students' holistic developmental trajectory.",
          "Ensures a highly safe, welcoming, and fully inclusive modern classroom setting for all pupils."
        ]
      }
    },
    {
      title: {
        tr: "Sınav Oluşturma",
        en: "Exam Creation & Assessment"
      },
      bullets: {
        tr: [
          "Öğrenci gelişimini düzenli olarak değerlendirmek için haftalık sınavlar uygular.",
          "Anlayışı ve bilgiyi ölçmek için çeşitli formatlarda dönem ortası ve dönem sonu sınavları oluşturur."
        ],
        en: [
          "Deploys structured weekly quizzes and assignments to continuously track student growth indices.",
          "Designs comprehensive mid-term and end-of-term examinations in multifaceted layouts to measure deep content understanding."
        ]
      }
    },
    {
      title: {
        tr: "Ders Planlama ve Modül Tasarımı",
        en: "Lesson Planning & Curriculum Design"
      },
      bullets: {
        tr: [
          "Öğrencilere dönem başında öğrenme kontrol listeleri sağlar.",
          "Geleneksel ve çevrimiçi öğrenme yöntemlerine dayalı İngilizce öğrenme etkinlikleri tasarlar.",
          "Sanal öğrenmeyi kolaylaştırmak için akıllı tahta ve çevrimiçi öğretim araçlarını kullanır."
        ],
        en: [
          "Equips students with comprehensive customized syllabus checklists right at the start of learning blocks.",
          "Architects immersive English-learning tasks spanning both conventional lectures and modern online interfaces.",
          "Maximizes digital toolsets, smart boards, and virtual education software to optimize remote learning delivery."
        ]
      }
    }
  ] as SkillItem[],
  awards: [
    {
      id: "award-1",
      title: {
        tr: "Uluslararası Akademik Yayınlar",
        en: "International Academic Publications"
      },
      description: {
        tr: "Enerji Tahminlemesinde Yapay Zekâ Uygulamaları üzerine hakemli akademik araştırmalar.",
        en: "Peer-reviewed academic research on AI applications in Energy Forecasting"
      }
    },
    {
      id: "award-2",
      title: {
        tr: "Yılın Öğretmeni",
        en: "Teacher of the Year"
      },
      description: {
        tr: "Yenilikçi öğretim yaklaşımları ve yüksek öğrenci başarı oranları dolayısıyla layık görüldü.",
        en: "Honored with the teaching excellence award for exceptional learner retention, student success rates, and interactive teaching style."
      }
    }
  ] as AwardItem[],
  testimonials: [
    {
      id: "test-1",
      name: "Elif Yıldırım",
      role: {
        tr: "IELTS Öğrencisi (Hedef Skor: 7.5)",
        en: "IELTS Student (Achieved Score: 7.5)"
      },
      rating: 5,
      text: {
        tr: "Hakan Hoca ile IELTS sınavına hazırlandım. Sayesinde hedeflediğim 7.5 skorunu ilk girişimde aldım! Dersleri son derece planlı, stratejik ve motivasyon doluydu. Kelime öğrenme teknikleri harika.",
        en: "I prepared for IELTS with Teacher Hakan. Thanks to him, I achieved my target 7.5 score on my very first try! His sessions are highly organized, strategic, and packed with encouragement. His vocabulary methods are gold."
      }
    },
    {
      id: "test-2",
      name: "Can Kaya",
      role: {
        tr: "Birebir Konuşma Sınıfı Öğrencisi",
        en: "1-on-1 Conversational English Student"
      },
      rating: 5,
      text: {
        tr: "Sıfırdan İngilizce öğrenmeye başladım ve Hakan Hoca'nın interaktif materyalleri sayesinde konuşma korkumu tamamen yendim. Sayesinde artık kendime güvenerek İngilizce sunumlar yapabiliyorum.",
        en: "I started learning English from scratch, and with Hakan's interactive materials, I completely conquered my speaking fear. Now, I can confidently deliver presentations in English at my company."
      }
    },
    {
      id: "test-3",
      name: "Doç. Dr. Selen Bozkurt",
      role: {
        tr: "YÖKDİL Hazırlık Öğrencisi / Akademisyen",
        en: "YÖKDİL Prep Student / Associate Professor"
      },
      rating: 5,
      text: {
        tr: "YÖKDİL sınavına hazırlık sürecimde bana inanılmaz destek oldu. Akademik okuma, cümle analizi ve sınav stratejileri konusundaki derin bilgisi sayesinde puanımı 60'tan 87.5'e yükselttim. Çok teşekkür ederim.",
        en: "He offered outstanding support during my YÖKDİL exam preparation. His profound grasp of academic translation, syntax, and test hacks enabled me to boost my score from 60 to 87.5. Thank you so much."
      }
    },
    {
      id: "test-4",
      name: "Merve & Ahmet Şahin",
      role: {
        tr: "Lise Hazırlık Öğrencisi Velileri",
        en: "Parents of Prep-School Student"
      },
      rating: 5,
      text: {
        tr: "Oğlumuzun Beykent Üniversitesi hazırlık sınıfı muafiyet sınavını başarıyla geçmesini sağladı. Velilerle olan yakın iletişimi, haftalık düzenli raporlamaları ve samimiyeti bizi son derece mutlu etti.",
        en: "He successfully trained our son to pass the prep school exemption exam of Beykent University. His close contact with us, detailed weekly progress reports, and genuine sincerity made us extremely happy."
      }
    },
    {
      id: "test-5",
      name: "Arda Öztürk",
      role: {
        tr: "TOEFL Sınav Öğrencisi",
        en: "TOEFL Exam Student"
      },
      rating: 5,
      text: {
        tr: "Yazma ve dinleme bölümlerinde yaşadığım tıkanıklıkları Hakan Hoca'nın pratik şablonları ve akıllı tahta egzersizleri ile aştım. Kendisiyle ders yapmak çok keyifli ve verimli.",
        en: "I overcame my writing and listening blocks using Hakan's practical essay templates and digital interactive board exercises. Practicing with him is both delightful and highly efficient."
      }
    }
  ] as Testimonial[]
};
