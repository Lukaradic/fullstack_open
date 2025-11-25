import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect } from 'vitest';
import { CreateBlog } from './CreateBlog';

describe('CreateBlog', () => {
  test('Create blog should call props function', async () => {
    const mockCreate = vi.fn();
    render(<CreateBlog handleCreate={mockCreate} />);
    const user = userEvent.setup();
    const showBtn = screen.queryByTestId('create-blog--btn__show');
    await user.click(showBtn);

    const createBtn = screen.queryByTestId('create-blog--btn__submit');
    const titleInput = screen.queryByTestId('create-blog--title');
    const authorInput = screen.queryByTestId('create-blog--author');
    const urlInput = screen.queryByTestId('create-blog--url');

    const titleVal = 'Create blog test';
    const authorVal = 'Test Test';
    const urlVal = 'www.google.com';

    await user.type(titleInput, titleVal);
    await user.type(authorInput, authorVal);
    await user.type(urlInput, urlVal);

    await user.click(createBtn);

    expect(mockCreate).toBeCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith({
      title: titleVal,
      author: authorVal,
      url: urlVal,
    });
  });
});
