import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WhatsAppButton } from '@/components/WhatsAppButton';

describe('WhatsAppButton', () => {
  it('opens WhatsApp chat with a pre-filled message', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<WhatsAppButton />);

    const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
    await user.click(button);

    expect(openSpy).toHaveBeenCalledWith(
      'https://wa.me/919671300080?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20Vevantae%20Labs%20products.',
      '_blank'
    );
  });
});
