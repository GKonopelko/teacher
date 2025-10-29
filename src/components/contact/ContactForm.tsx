import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  goal: string;
  level: string;
  format: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    goal: '',
    level: '',
    format: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || 'Ошибка сервера');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(
          `Не удалось отправить заявку: ${error.message}. Пожалуйста, свяжитесь со мной по телефону или email.`
        );
      } else {
        setError(
          'Не удалось отправить заявку. Пожалуйста, свяжитесь со мной по телефону или email.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h3>Заявка отправлена!</h3>
        <p>Я свяжусь с вами в течение 24 часов для уточнения деталей.</p>
        <div className="text-left">
          <p>
            <strong>Что произошло:</strong>
          </p>
          <ul>
            <li>Уведомление отправлено в Telegram</li>
            <li>Письмо отправлено на email</li>
            <li>Заявка сохранена в базе</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Ваше имя *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Телефон</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="goal">Цель изучения</label>
        <select id="goal" name="goal" value={formData.goal} onChange={handleChange}>
          <option value="">Выберите цель</option>
          <option value="work">Работа в Финляндии</option>
          <option value="study">Учеба в Финляндии</option>
          <option value="migration">Переезд в Финляндию</option>
          <option value="school">Помощь школьнику</option>
          <option value="hobby">Для себя/хобби</option>
          <option value="yki">Подготовка к YKI-тесту</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div>
        <label htmlFor="level">Текущий уровень</label>
        <select id="level" name="level" value={formData.level} onChange={handleChange}>
          <option value="">Выберите уровень</option>
          <option value="beginner">Начинающий (0)</option>
          <option value="basic">Базовый (A1-A2)</option>
          <option value="intermediate">Средний (B1-B2)</option>
          <option value="advanced">Продвинутый (C1-C2)</option>
          <option value="unknown">Не знаю</option>
        </select>
      </div>

      <div>
        <label htmlFor="format">Предпочтительный формат</label>
        <select id="format" name="format" value={formData.format} onChange={handleChange}>
          <option value="">Выберите формат</option>
          <option value="individual">Индивидуальные уроки</option>
          <option value="pair">Занятия в паре</option>
          <option value="offline">Очно в СПб</option>
          <option value="unknown">Не знаю</option>
        </select>
      </div>

      <div>
        <label htmlFor="message">Дополнительная информация</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Расскажите о ваших целях, пожеланиях по расписанию, опыте изучения языков..."
        />
      </div>

      {error && <div>{error}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>

      <p>Заявка придет в Telegram, на email и сохранится в базе</p>
    </form>
  );
}
