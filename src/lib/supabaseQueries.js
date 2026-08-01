import { supabase } from './supabaseClient';

// ---------- USERS / AUTH ----------

export async function claimUsername(username) {
  const trimmed = username.trim();
  if (!trimmed) return { error: 'USERNAME CANNOT BE BLANK' };

  const { data: existing, error: selectError } = await supabase
    .from('users')
    .select('*')
    .ilike('username', trimmed)
    .maybeSingle();

  if (selectError) return { error: selectError.message };
  if (existing) return { user: existing };

  const { data: created, error: insertError } = await supabase
    .from('users')
    .insert({ username: trimmed })
    .select()
    .single();

  if (insertError) {
    return { error: 'THAT ID WAS JUST CLAIMED. TRY ANOTHER.' };
  }
  return { user: created };
}

// ---------- POSTS ----------

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id, author_id, title, body, image_url, upvote_count,
      accepted_comment_id, created_at,
      users ( username ),
      comments!comments_post_id_fkey ( count )
    `
    )
    .order('created_at', { ascending: false });

  if (error) return { error: error.message };

  const posts = data.map((p) => ({
    ...p,
    author_username: p.users?.username ?? 'unknown',
    comment_count: p.comments?.[0]?.count ?? 0,
  }));

  return { posts };
}

export async function fetchPostById(id) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id, author_id, title, body, image_url, upvote_count,
      accepted_comment_id, created_at,
      users ( username )
    `
    )
    .eq('id', id)
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return { post: null };

  return {
    post: { ...data, author_username: data.users?.username ?? 'unknown' },
  };
}

export async function createPost({ authorId, title, body, imageUrl }) {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: authorId,
      title,
      body,
      image_url: imageUrl || null,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { post: data };
}

export async function updatePost(postId, { title, body, imageUrl }) {
  const { data, error } = await supabase
    .from('posts')
    .update({ title, body, image_url: imageUrl || null })
    .eq('id', postId)
    .select()
    .single();

  if (error) return { error: error.message };
  return { post: data };
}

export async function deletePost(postId) {
  const { error } = await supabase.from('posts').delete().eq('id', postId);
  if (error) return { error: error.message };
  return { success: true };
}

export async function setAcceptedComment(postId, commentId) {
  const { data, error } = await supabase
    .from('posts')
    .update({ accepted_comment_id: commentId })
    .eq('id', postId)
    .select()
    .single();

  if (error) return { error: error.message };
  return { post: data };
}

// ---------- COMMENTS ----------

export async function fetchComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('id, post_id, author_id, body, created_at, users ( username )')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) return { error: error.message };

  const comments = data.map((c) => ({
    ...c,
    author_username: c.users?.username ?? 'unknown',
  }));

  return { comments };
}

export async function createComment({ postId, authorId, body }) {
  const { data, error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: authorId, body })
    .select('id, post_id, author_id, body, created_at, users ( username )')
    .single();

  if (error) return { error: error.message };
  return {
    comment: { ...data, author_username: data.users?.username ?? 'unknown' },
  };
}

// ---------- VOTES ----------

export async function fetchUserVotes(userId) {
  const { data, error } = await supabase
    .from('votes')
    .select('post_id')
    .eq('user_id', userId);

  if (error) return { error: error.message };
  return { votedPostIds: data.map((v) => v.post_id) };
}

export async function toggleVote(postId, userId, currentlyVoted) {
  if (currentlyVoted) {
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from('votes')
      .insert({ post_id: postId, user_id: userId });
    if (error) return { error: error.message };
  }

  const { data, error: countError } = await supabase
    .from('posts')
    .select('upvote_count')
    .eq('id', postId)
    .single();

  if (countError) return { error: countError.message };
  return { upvoteCount: data.upvote_count, voted: !currentlyVoted };
}