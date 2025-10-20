import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import Blog from './Blog';

const blogData = {
  title: 'Testing user blog creation 2',
  author: 'Luka Radic',
  url: 'https://luÏkaradicsblog.com/first',
  likes: 22,
  user: {
    username: 'lar',
    name: 'Luka Radic',
    blogs: [
      '68ee3f2917742fbe6c59c831',
      '68ee42bc0be79b441ff3768d',
      '68ee42cb0be79b441ff37692',
      '68ee5ae016a0bc06438b25f8',
      '68f124ff45631c2a9ea9d61c',
      '68f1251a45631c2a9ea9d61f',
    ],
    id: '68ebae81c6cff0c6b9b6ca22',
  },
  id: '68ee42bc0be79b441ff3768d',
};

describe('Blog.jsx', () => {
  test("Url and likes shouldn't be visible", () => {
    render(<Blog blog={blogData} />);

    const title = screen.queryByTestId('blog--title');
    const author = screen.queryByTestId('blog--author');
    const likes = screen.queryByTestId('blog--likes');
    const url = screen.queryByTestId('blog--url');

    expect(title).toBeDefined();
    expect(author).toBeNull();
    expect(likes).toBeNull();
    expect(url).toBeNull();
  });

  test('Url and likes should be visible after view is clicked', async () => {
    render(<Blog blog={blogData} />);

    const user = userEvent.setup();
    const viewBtn = screen.queryByTestId('blog--btn__show-details');
    await user.click(viewBtn);

    const likes = screen.queryByTestId('blog--likes');
    const url = screen.queryByTestId('blog--url');

    expect(likes).toBeDefined();
    expect(url).toBeDefined();
  });

  test('Clicking like should trigger the function from props', async () => {
    const mockLikeFunction = vi.fn();
    render(<Blog blog={blogData} handleLike={mockLikeFunction} />);
    const user = userEvent.setup();
    const viewBtn = screen.queryByTestId('blog--btn__show-details');

    await user.click(viewBtn);

    const likeBtn = screen.queryByTestId('blog--btn__like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockLikeFunction).toBeCalledTimes(2);
  });
});
