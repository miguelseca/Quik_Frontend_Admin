import { EnumServiceCodeToTextPipe } from '../enums/enum-service-code-to-text.pipe';

describe('EnumServiceCodeToTextPipe', () => {
  it('create an instance', () => {
    const pipe = new EnumServiceCodeToTextPipe();
    expect(pipe).toBeTruthy();
  });
});
