import emailjs from '@emailjs/browser';

// ============================================
// EmailJS Configuration
// Agar aap EmailJS use karna chahte hain to:
// 1. https://www.emailjs.com/ par account banayein
// 2. Email Services → Add Gmail (ya koi bhi email)
// 3. Email Templates → Create template
// 4. Neeche apni keys daalein
// ============================================

const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

let isInitialized = false;

function initEmailJS() {
  if (!isInitialized && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(PUBLIC_KEY);
    isInitialized = true;
  }
}

export const sendEmail = async (formData) => {
  // Agar EmailJS configure nahi hai, to error throw karo
  // Contact component automatically email client khol dega
  if (
    PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
    SERVICE_ID === 'YOUR_SERVICE_ID' ||
    TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
  ) {
    throw new Error('EmailJS not configured — using email client fallback');
  }

  initEmailJS();

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Babar Ali',
      reply_to: formData.email,
    });
    return { success: true, data: result };
  } catch (error) {
    throw error;
  }
};
