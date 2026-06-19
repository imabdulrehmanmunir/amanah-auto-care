  
        // Set Current Year
        document.getElementById('year').textContent = new Date().getFullYear();

        // AOS Initialization (Optimized for no lag)
        AOS.init({
            once: true,
            offset: 30,
            duration: 500,
            easing: 'ease-out',
            disable: 'mobile' // Disabled on mobile to guarantee smooth scrolling
        });

        // Swiper Initialization
        const swiper = new Swiper('.testimonialSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });

        // Navbar & Fast Scroll Progress
        const navbar = document.getElementById('navbar');
        const scrollProgress = document.getElementById('scroll-progress');

        // requestAnimationFrame for max performance scroll handling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Navbar
                    if (window.scrollY > 50) {
                        navbar.classList.add('shadow-xl', 'bg-navy/95', 'border-b', 'border-gray-800');
                        navbar.classList.remove('bg-transparent', 'border-transparent');
                    } else {
                        navbar.classList.remove('shadow-xl', 'bg-navy/95', 'border-b', 'border-gray-800');
                        navbar.classList.add('bg-transparent', 'border-transparent');
                    }
                    
                    // Scroll Progress
                    const totalScroll = document.documentElement.scrollTop;
                    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollRatio = totalScroll / windowHeight;
                    scrollProgress.style.transform = `scaleX(${scrollRatio})`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Language Toggle
        function toggleLanguage() {
            const html = document.documentElement;
            if (html.getAttribute('dir') === 'ltr') {
                html.setAttribute('dir', 'rtl');
                html.setAttribute('lang', 'ar');
            } else {
                html.setAttribute('dir', 'ltr');
                html.setAttribute('lang', 'en');
            }
            swiper.update();
        }

        // Optimized Counter Animation
        const counters = document.querySelectorAll('.counter');
        let countersAnimated = false;
        
        const animateCounters = () => {
            if(countersAnimated) return;
            countersAnimated = true;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 1500;
                const steps = 30;
                const stepTime = Math.abs(Math.floor(duration / steps));
                let current = 0;
                
                const timer = setInterval(() => {
                    current += target / steps;
                    if(current >= target) {
                        counter.innerText = target;
                        clearInterval(timer);
                    } else {
                        counter.innerText = Math.ceil(current);
                    }
                }, stepTime);
            });
        };

        const counterSection = document.getElementById('counter-section');
        if(counterSection && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            }, { threshold: 0.3 });
            observer.observe(counterSection);
        } else {
            animateCounters();
        }

        // FAQ Data Generation
        const faqs = [
            { enQ: "Do you repair car electrical problems in Makkah?", arQ: "هل تقومون بإصلاح المشاكل الكهربائية للسيارات في مكة؟", enA: "Yes, we specialize in comprehensive auto electrical repairs, ECU diagnostics, and computer scanning.", arA: "نعم، نحن متخصصون في الإصلاحات الكهربائية الشاملة للسيارات، فحص كمبيوتر المحرك، والتشخيص الدقيق." },
            { enQ: "Do you provide AC repair services?", arQ: "هل تقدمون خدمات إصلاح مكيفات السيارات؟", enA: "Absolutely. We offer complete AC diagnostics, gas refilling, compressor repair, and leak detection.", arA: "بالتأكيد. نقدم خدمات فحص المكيف الشاملة، تعبئة الفريون، إصلاح الكمبروسر، وكشف التسريبات." },
            { enQ: "How can I get your workshop location?", arQ: "كيف يمكنني الحصول على موقع الورشة؟", enA: "Please contact us via WhatsApp or phone call, and we will share our exact pinned location immediately.", arA: "يرجى التواصل معنا عبر الواتساب أو الاتصال الهاتفي وسنرسل لك موقعنا الدقيق فوراً." },
            { enQ: "Do you offer diagnostics?", arQ: "هل تقدمون خدمة فحص السيارات؟", enA: "Yes, we use the latest computer scanners to diagnose engine, transmission, and electrical issues accurately.", arA: "نعم، نستخدم أحدث أجهزة فحص الكمبيوتر لتشخيص مشاكل المحرك وناقل الحركة والأنظمة الكهربائية بدقة." },
            { enQ: "What kind of mechanical work do you do?", arQ: "ما نوع الأعمال الميكانيكية التي تقومون بها؟", enA: "We handle general mechanics, suspension repairs, brake services, preventative maintenance, and minor engine repairs.", arA: "نقوم بأعمال الميكانيكا العامة، إصلاح نظام التعليق (العفشة)، الفرامل، الصيانة الدورية، وإصلاحات المحرك." },
            { enQ: "Do you provide a warranty on your work?", arQ: "هل تقدمون ضماناً على عملكم؟", enA: "Yes, we provide a service guarantee on our labor to ensure complete customer satisfaction.", arA: "نعم، نقدم ضماناً على شغل اليد لضمان رضا العميل التام." }
        ];

        const faqContainer = document.getElementById('faq-container');
        faqs.forEach((faq, index) => {
            const faqHTML = `
                <div class="bg-[#111D32] border border-gray-800 rounded-xl overflow-hidden transition-colors hover:border-gold/30">
                    <button class="w-full px-6 py-5 text-left rtl:text-right flex justify-between items-center focus:outline-none" onclick="toggleFaq(${index})">
                        <span class="font-bold text-lg text-white">
                            <span class="en">${faq.enQ}</span><span class="ar">${faq.arQ}</span>
                        </span>
                        <i class="fa-solid fa-chevron-down text-gold transition-transform duration-300" id="faq-icon-${index}"></i>
                    </button>
                    <div class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-navy/50" id="faq-content-${index}">
                        <div class="px-6 pb-5 text-gray-400 leading-relaxed text-sm md:text-base">
                            <span class="en">${faq.enA}</span><span class="ar">${faq.arA}</span>
                        </div>
                    </div>
                </div>
            `;
            faqContainer.innerHTML += faqHTML;
        });

        function toggleFaq(index) {
            const content = document.getElementById(`faq-content-${index}`);
            const icon = document.getElementById(`faq-icon-${index}`);
            
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                faqs.forEach((_, i) => {
                    document.getElementById(`faq-content-${i}`).style.maxHeight = '0px';
                    document.getElementById(`faq-icon-${i}`).style.transform = 'rotate(0deg)';
                });
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        }
