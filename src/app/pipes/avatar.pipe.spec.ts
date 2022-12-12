import { AvatarPipe } from './avatar.pipe';

describe('AvatarPipe', () => {
  it('Crear la instancia', () => {
    const pipe = new AvatarPipe();
    expect(pipe).toBeTruthy();
  });
});
